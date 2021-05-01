import { MessageEmbed } from "discord.js"
import { Command } from "../lib"
import { IHelp } from "../lib/command"
import VoiceLog from "../models/voice-log"

// Здесь возможен гкод, делал это уже в 2 ночи и с подобными задачами у меня всегда были проблемы
// Наиболее вероятно, что даже другой джун сможет это сделать лучше меня.
export default class PingCommand extends Command {
    public aliases: string[] = ["stats", "stat", "статы", "стат", "статистика"]
    public help: IHelp = {
        name: "stats",
        description: "Статистика входов/выходов в войсах.",
        usage: "stats"
    }
    public ownerOnly: boolean = true

    async exec({ channel, guild }) {
        const channels = await VoiceLog.find().exec()
        const dateSortedChannels = new Map()
        const embed = new MessageEmbed()
        let joinLeaveCounter = 0
        for (const channel of channels) {
            const key = 
            `От ${channel.logEnabledAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})} ` + 
            `до ${channel.logDisabledAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'}) || "{Логирование не завершено}}"}`

            const prev = dateSortedChannels.get(key)
            dateSortedChannels.set(key, [channel])
            if (prev)
                dateSortedChannels.set(key, [channel, ...prev[key]])
        }
        
        for (const [date, channels] of dateSortedChannels) {
            const name = `__**${date}:**__\n`
            let value: string 
            for (const channel of channels)
                for (const user of channel.users) {
                    joinLeaveCounter++
                    const member = guild.members.cache.get(user.id)
                    const channelName = guild.channels.cache.get(channel.channelID).name
                    value =
                    `🔉 Канал: #${channelName}\n` +
                    `👨 Пользователь: ${member} (${member.user.tag})\n` +
                    `✅ Вошёл: ${user.joinedAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})}\n` +
                    `❌ Вышел: ${user.leavedAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'}) || "{Время выхода из канала не зафиксировано}"}\n\n`
                }
            embed.addField(name, value, false)
        }
        embed.setTitle(`Время указано по МСК`)
        embed.setDescription(`Общее количество зафиксированных входов/выходов: ${joinLeaveCounter}`)
        embed.setColor("2f3136")
        channel.send(embed)
    }
}