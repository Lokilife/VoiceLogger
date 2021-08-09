import fs           from 'fs'
import { join }     from 'path'
import Client       from './client'
import Command      from './command'
import Listener     from './listener'
import UserModel    from '../models/user'
import { GuildMember, Snowflake, User, VoiceChannel } from 'discord.js'
import strftime from 'strftime'

/**
 * A function which add
 * all files with event listeners in provided dir.
 * @param {Client} client 
 * @param {string} listenersDir 
 */
export function loadListeners(client: Client, listenersDir: string) {
  for (const file of fs.readdirSync(listenersDir, {withFileTypes: true})) {
    if (file.isFile()) {
      try {
        const listenerClass = require(join(listenersDir, file.name)).default
                
        if (!Listener.isPrototypeOf(listenerClass)) // Проверяем наследует ли полученный нами класс класс события.
          return
                
        const listener = new listenerClass(client)

        client.addListener(listener.type, listener.exec.bind(listener))
        console.log(`+ ${file.name}`)
      } catch(e) {
        console.log(`Cannot load ${file.name}\nError: ${e.stack}`)
      }
    }
  }
}

/**
 * A function which add
 * all files with event listeners in provided dir.
 * @param {Client} client 
 * @param {string} commandsDir 
 */
export function loadCommands(client: Client, commandsDir: string) {
  for (const file of fs.readdirSync(commandsDir, {withFileTypes: true})) {
    if (file.isFile()) {
      try {
        const commandClass = require(join(commandsDir, file.name)).default
                
        if (!Command.isPrototypeOf(commandClass)) // Проверяем наследует ли полученный нами класс класс события.
          return
        
        const command = new commandClass(client)

        client.commands.push(command)

        console.log(`+ ${file.name}`)
      } catch(e) {
        console.log(`Cannot load ${file.name}\nError: ${e.stack}`)
      }
    }
  }
}

export async function AddOrGetUser(user: User | GuildMember | Snowflake, mode: string) {
  const id: Snowflake = (user instanceof User || user instanceof GuildMember) ? user.id : user
  var userDoc = await UserModel.findOne({userID: id, logMode: mode}).exec()

  if (userDoc) return userDoc

  userDoc = new UserModel()
  userDoc.userID = id
  userDoc.note = "Заметка отсутствует"
  userDoc.logMode = mode
  userDoc.joins = []

  return await userDoc.save()
}

export async function UserJoin(user: User | GuildMember | Snowflake, channel: VoiceChannel | Snowflake, logEnabledAt: Date, mode: string) {
  const userID: Snowflake = user instanceof User || user instanceof GuildMember ? user.id : user
  const channelID = channel instanceof VoiceChannel ? channel.id : channel
  const userDoc = await AddOrGetUser(userID, mode)

  const join = userDoc.joins.find(join => !join.logDisabledAt && !join.leavedAt)

  if (join) return join

  userDoc.joins.push({
    channelID: channelID,
    logEnabledAt: logEnabledAt,
    logDisabledAt: null,
    joinedAt: new Date(),
    leavedAt: null
  })

  await UserModel.updateOne({userID: userID}, {$set: {joins: userDoc.joins}}).exec()
}

export async function UserLeave(user: User | GuildMember | Snowflake, channel: VoiceChannel | Snowflake, mode: string) {
  const userID: Snowflake = user instanceof User || user instanceof GuildMember ? user.id : user,
    userDoc = await AddOrGetUser(userID, mode),
    channelID = channel instanceof VoiceChannel ? channel.id : channel,
    index = userDoc.joins.findIndex(join => !join.logDisabledAt && !join.leavedAt && join.channelID == channelID),
    join = userDoc.joins[index]

  if (!userDoc.joins.length || !join) return

  userDoc.joins[index] = {
    logEnabledAt: join.logEnabledAt,
    logDisabledAt: null,
    joinedAt: join.joinedAt,
    leavedAt: new Date(),
    channelID: join.channelID
  }

  await UserModel.updateOne({userID}, {$set: {joins: userDoc.joins}}).exec()
}

export async function DisableLog() {
  const users = await UserModel.find().exec()
  for (const user of users) {
    for (const { channelID, logDisabledAt } of user.joins) {
      if (logDisabledAt) continue
      const index = user.joins.findIndex(join => join.channelID == channelID && !join.logDisabledAt)
      const join = user.joins[index]
      join.logDisabledAt = new Date()
      join.leavedAt = join.leavedAt || new Date()
      user.joins[index] = join
    }
    await UserModel.updateOne({userID: user.userID}, {$set: {joins: user.joins}})
  }
}

export function isDate(date): boolean {
  return !isNaN(GetDate(date).valueOf())
}

export function GetDateWithoutTime(date: Date): string {
  return strftime("%D", date)
}

export async function GetUsersForDateAndMode(date: Date, mode: string) {
  const usersDocs = await UserModel.find().exec(),
    finalUsers = []

  for (const userDoc of usersDocs) {
    if (!mode || userDoc.logMode != mode) continue
    const finalJoins = []
    for (const join of userDoc.joins)
      if (GetDateWithoutTime(join.logEnabledAt) == GetDateWithoutTime(date)) finalJoins.push(join)

    if (!finalJoins.length) continue

    userDoc.joins = finalJoins
    finalUsers.push(userDoc)
  }

  return finalUsers
}

export function GetTotalTime(joins): number {
  var time = 0

  for (const join of joins) {
    if (!join.leavedAt) continue
    time += join.leavedAt.valueOf() - join.joinedAt.valueOf()
  }

  return (time - time % 1000) / 1000
}

export function GetDate(date: string): Date {
  const dateArr = date.split(/\./g).reverse()
  if (dateArr.length == 3 && !dateArr[0].startsWith("20"))
    dateArr[0] = "20" + dateArr[0]
  return dateArr.length == 2 ? new Date(dateArr.join('.') + "." + new Date().getFullYear()) : new Date(dateArr.join('.'))
}

export function GetSortedUserJoins(userDoc) {
  const map = new Map<string, any[]>()

  for (const join of userDoc.joins) {
    const prevJoins = map.get(strftime("%D", join.joinedAt)),
      writeJoin = {joinedAt: join.joinedAt, leavedAt: join.leavedAt, channelID: join.channelID}
        
    map.set(strftime("%D", join.joinedAt), prevJoins ? [writeJoin, ...prevJoins] : [writeJoin])
  }

  return map
}

export function StatsPagesSplitter(users: User[], usersDocs: any[]) {
  const result = new Array<Array<[string, string]>>()
  const getUserDoc = (user: User) => usersDocs.find(doc => doc.userID == user.id)
  let thisPage: Array<[string, string]> = new Array()
  let embLen = 0

  for (const user of users) {
    const userDoc = getUserDoc(user);
    const fieldName = `${user.tag} ⏱️ ${GetTotalTime(userDoc.joins)}\n`;
    let fieldValue = "";
    function iterJoins(joins) {
        let moreThanOne = false
        for (const [index, join] of joins.entries()) {
            let value = `${index+1}. ${strftime("%R", join.joinedAt)}${join.leavedAt ? `- ${strftime("%R", join.leavedAt)}` : ""}\n`;
            let fieldLen = (fieldValue + value).length;
            if (fieldLen + embLen + fieldName.length > 6000) {
                console.log(thisPage);
                result.push(JSON.parse(JSON.stringify(thisPage)));
                thisPage = [];
                fieldValue = "";
                embLen = 0;
                moreThanOne = false;
                return iterJoins(joins.slice(index - 1));
            }
            if (fieldLen > 1024) {
                thisPage.push([fieldName, JSON.parse(JSON.stringify(fieldValue))]);
                console.log(fieldValue)
                fieldValue = value;
                moreThanOne = true
                continue;
            }
            fieldValue += value;
            embLen += fieldLen + fieldName.length;
        }
        if (!moreThanOne) thisPage.push([fieldName, fieldValue.slice()]);
    }
    iterJoins(userDoc.joins);
  }

  return result
}
