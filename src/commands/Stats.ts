import { GetDate, GetTotalTime, GetUsersForDateAndMode, isDate, GetSortedUserJoins } from '../lib/utils'
import { Message, MessageEmbed } from 'discord.js'
import { IHelp } from '../lib/command'
import User from '../models/user'
import { Command } from '../lib'
import strftime from 'strftime'
const strftimeTimeZone = strftime.timezone('Europe/Moscow')

const modes: string[] = process.env.LOGGER_MODES
    .split(',')
    .map(e => e.trim())
    .filter(e => !!e)

export default class StatsCommand extends Command {
    public aliases: string[] = ["stats", "stat", "статы", "стат", "статистика"]
    public help: IHelp = {
        name: "stats",
        description: "Статистика входов/выходов в войсах.",
        usage: "stats <Дата/Участник> [Режим]",
        category: "Логирование"
    }
    public loggerAccessOnly: boolean = true

    async exec(message: Message, [selectedDateOrUser, ...selectedModeArr]: string[], selectedPage: number = 1, prevMsg: Message = null) {
        const selectedMode = selectedModeArr.join(' ')

        if (!selectedDateOrUser)
            return message.channel.send("❌ Хей! Подскажи пожалуйста, у кого я должен вывести статистику?")

        if (isDate(selectedDateOrUser)) {
            const date = GetDate(selectedDateOrUser),
                  users = await GetUsersForDateAndMode(date, selectedMode),
                  page = selectedPage,
                  maxPages = users.length <= 10 ? (users.length - users.length % 10) / 10 + 1 : (users.length - users.length % 10) / 10,
                //   maxPages = users.length,
                  fields = [],
                  embed = new MessageEmbed({
                      title: `Статистика посещения ${strftimeTimeZone("%d.%m.%y", date)}`,
                      color: 0x2f3136,
                      footer: {
                          text: `Page ${page}/${maxPages}`
                      }
                  })

            if (page > maxPages && page > 1)
                return await message.channel.send("❌ WTF??? Нет у меня такой страницы!")
            
            for (const user of users) {
                const totalTime = GetTotalTime(user.joins),
                member = message.guild.members.resolve(user.userID),
                hours = Math.floor(totalTime / 3600 % 24),
                minutes = Math.floor(totalTime / 60 % 60)
                
                fields.push({
                    name: `${member.user.tag}  ⌚ ${hours < 10 ? "0": ""}${hours}:${minutes < 10 ? "0": ""}${Math.floor(minutes)}`,
                    value: user.joins.map((join, index) => `Join **#${index+1}** ${strftimeTimeZone("%R", join.joinedAt)}${join.leavedAt ? `\nLeft **#${index+1}** ${strftimeTimeZone("%R", join.leavedAt)}` : ""}`)
                })
            }
        
            embed.addFields(fields.slice((page-1) * 10, page * 10))
            // embed.addFields(fields.slice((page-1), page))

            if (!fields.length) {
                embed.setDescription("За эту сессию пользователей не зафиксировано")
                return message.channel.send(embed)
            }
            
            const msg: Message = prevMsg || await message.channel.send(embed)

            if (prevMsg)
                await prevMsg.edit(embed)

            if (maxPages == 1)
                return

            if (page > 1)
                await msg.react("◀️")

            if (page < maxPages)
                await msg.react("▶️")

            const reaction = (await msg.awaitReactions((reaction, user) => ((page > 1 && reaction.emoji.name == "◀️") || (page < maxPages && reaction.emoji.name == "▶️")) && user.id == message.author.id, { idle: 3e4, max: 1 })).first()

            if (!reaction) {
                await msg.edit(embed.setDescription(":x: Прошло 30 секунд, но никакой реакции не было найдено.\nP. s. Отправь команду ещё раз чтобы возобновить скролл."))
                await msg.reactions.removeAll()
                return
            }
            await msg.reactions.removeAll()

            await this.exec(message, [selectedDateOrUser, selectedMode],
                reaction.emoji.name == "◀️" ? (page-1) : reaction.emoji.name == "▶️" ? (page+1) : page,
                msg
            )
            return
        }
        const userIDs = selectedDateOrUser.match(/[0-9]{18}/g),
              userID = userIDs instanceof Array ? userIDs[0] : null

        if (!userID)
            return await message.channel.send("Некорректный пользователь или дата.\nP. S. Чтобы указать пользователя используйте упоминание или ID.")

        if (!modes.includes(selectedMode))
            return await message.channel.send(`Режима \`${selectedMode || "Не указан"}\` не существует в текущем конфиге.\n` + 
                                              `Доступные режимы: \`${modes.join('`, `')}\``)

        const userDoc = await User.findOne({userID: userID, logMode: selectedMode}).exec(),
              member = message.guild.members.resolve(userID)
        
        const embed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Статистика пользователя ${member.user.tag}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setDescription(userDoc ? userDoc.note : `Данный пользователь отсутствует в базе данных в режиме \`${selectedMode}\`.`)
        if (userDoc)
                embed.addFields(Array.from(GetSortedUserJoins(userDoc)).map(([date, joins]) => {
                    const totalTime = GetTotalTime(joins),
                          hours = Math.floor(totalTime / 3600 % 24),
                          minutes = Math.floor(totalTime / 60 % 60)
                        
                    return {
                        name: `${strftimeTimeZone("%d.%m.%y", new Date(date))}  ⌚ ${hours < 10 ? "0": ""}${hours}:${minutes < 10 ? "0": ""}${Math.floor(minutes)}`,
                        value: joins.map(
                            (join, index) => `**#${index+1}** ${strftimeTimeZone("%R", join.joinedAt)}${join.leavedAt ? ` - ${strftimeTimeZone("%R", join.leavedAt)}` : ""}`)
                    }
                }))
        
        await message.channel.send(embed)
    }
}
