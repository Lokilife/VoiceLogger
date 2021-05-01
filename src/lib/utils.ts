/// <reference path="typings.d.ts" />

import Listener     from './listener'
import Client       from './client'
import { join }     from 'path'
import fs           from 'fs'
import Command from './command'
import { GuildMember, Snowflake, User, VoiceChannel } from 'discord.js'
import VoiceLog from '../models/voice-log'

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

                for (const alias of command.aliases)
                    client.commands.set(alias.toLowerCase(), command)

                console.log(`+ ${file.name}`)
            } catch(e) {
                console.log(`Cannot load ${file.name}\nError: ${e.stack}`)
            }
        }
    }
}

export async function AddChannel(voiceChannel: VoiceChannel, enabledAt: Date) {
    const channel = await VoiceLog.findOne({channelID: voiceChannel.id, logEnabledAt: enabledAt, logDisabledAt: null}).exec()

    // Простая проверка, чтобы в случае чего не мусорить в бд и не ломать работу логирования
    if (channel) return channel

    return (await VoiceLog.insertMany({
        channelID: voiceChannel.id,
        logEnabledAt: enabledAt,
        logDisabledAt: null,
        users: []
    }))[0]
}

export async function DisableLog() {
    await VoiceLog.updateMany({logDisabledAt: null}, {$set: {logDisabledAt: new Date()}}).exec()
}

export function UserLeaved(user: User | GuildMember | Snowflake, channel) {
    const id = typeof user == "string" ? user : user.id
    user = FindUser(id, channel.users)
    // Если он каким-то мистическим образом зашёл в канал и не попал под логер (например бот был в оффе или сам логгер был отключен), то мы его пропускаем во избежание ошибок
    if (!user) return []

    const index = channel.users.indexOf(user)
    channel.users[index].leavedAt = new Date()
    return channel.users
}

export function FindUser(user: User | GuildMember | Snowflake, array: any[]) {
    const id = typeof user == "string" ? user : user.id
    for (const user of array) 
        if (user.id == id && !user.leavedAt && !user.logDisabledAt)
            return user
}