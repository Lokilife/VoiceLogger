import { VoiceState } from "discord.js"
import { Listener, Utils } from "../lib"
import VoiceLog from "../models/voice-log"

const voices: string[] = process.env.VOICES
    .split(",")
    .map(elem => elem.trim())
    .filter(elem => !!elem)

export default class VoiceStateListener extends Listener {
    public type: EventTypes = "voiceStateUpdate"
    public id: string = "voiceStateUpdate"

    async exec(oldState: VoiceState, newState: VoiceState) {
        if (!this.client.logEnabled) return

        if (voices.length && !voices.includes(newState.channelID || oldState.channelID)) return

        // А тут уже разные условия для разных действий в войсах
        if (newState.channel &&
            !oldState.channel) { // Подключился к каналу
            const channel = await Utils.AddChannel(newState.channel, this.client.logEnabledAt)

            channel.users.push({
                joinedAt: new Date(),
                leavedAt: "",
                id: newState.member.id
            })
            await VoiceLog.updateOne(
                {
                    channelID: newState.channelID,
                    logDisabledAt: null
                },
                {
                    $set: {
                        users: channel.users
                    }
                })
        }
        if (!newState.channel &&
            oldState.channel) { // Вышел из канала
            
            const channel = await Utils.AddChannel(oldState.channel, this.client.logEnabledAt)
            
            // UserLeaved возвращает не одного юзера, а сразу массив со всеми остальными юзерами которые были зафиксированы логером, но изменяется лишь только указанный
            const users = Utils.UserLeaved(oldState.member, channel)
            
            await VoiceLog.updateOne({channelID: oldState.channelID, logDisabledAt: null}, {$set: {users: users}})
        }
        if (newState.channel &&
            oldState.channel &&
            newState.channel.id != oldState.channel.id) { // Пришёл из другого канала
            // Второй раз одна и та же проверка, но теперь оба канала раздельно, чтобы опять же избежать некоторых проблем с БД
            if (!voices.length || voices.includes(newState.channelID)) { // Если канал в который пришёл логируется
                let channel = await VoiceLog.findOne({channelID: newState.channelID, logDisabledAt: null}).exec()

                channel.users.push({
                    logEnabledAt: this.client.logEnabledAt,
                    logDisabledAt: "",
                    joinedAt: new Date(),
                    leavedAt: "",
                    id: newState.member.id
                })
                await VoiceLog.updateOne(
                    {
                        channelID: newState.channelID
                    },
                    {
                        $set: {
                            users: channel.users
                        }
                    })
            }
            if (!voices.length || voices.includes(oldState.channelID)) { // Если канал из которого пришли логируется
                const channel = await Utils.AddChannel(oldState.channel, this.client.logEnabledAt)
                const users = Utils.UserLeaved(oldState.member, channel)
                await VoiceLog.updateOne({channelID: oldState.channelID}, {$set: {users: users}})
            }
        } 
    }
}