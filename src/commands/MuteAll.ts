import { Message, MessageEmbed, Snowflake } from "discord.js"
import { Command } from "../lib"
import { IHelp } from "../lib/command"

export default class StopCommand extends Command {
    public aliases: string[] = ["muteall", "mute_all", "mutevoice", "mute_voice"]
    public help: IHelp = {
        name: "mute_all",
        description: "Мьютит всех в пользователей в голосовом канале.\nТребует право мьютить в голосовом канале в котором вы находитесь.",
        usage: "mute_all",
        category: "Разное"
    }
    private exceptions: Snowflake[] = process.env.MUTE_EXCEPTIONS.split(',').map(exception => exception.trim()).filter(elem => !!elem)
    
    async exec(message: Message) {
        const channel = message.member.voice.channel,
              guild = message.guild
        
        if (!channel)
            return await message.channel.send("❌ Не пытайся меня обмануть, я знаю что ты не в войсе :)")
        
        if (!channel.permissionsFor(message.member).has("MUTE_MEMBERS"))
            return await message.channel.send("❌ Ну не пытайся обмануть меня, я ведь прекрасно вижу что у тебя нет прав мьютить в этом канале :(")

        if (!channel.permissionsFor(guild.me).has("MUTE_MEMBERS"))
            return await message.channel.send("❌ Я бы хотел сказать что у тебя нет прав мьютить, но сейчас нет прав у меня(")

        var mutes = [],
            exceptions = []

        for (const [id, member] of channel.members)
            if (id == message.author.id) 
                exceptions.push(`${member.user.tag} (${member}) (Вызвал команду)`)
            else if (this.exceptions.includes(id)) 
                exceptions.push(`${member.user.tag} (${member}) (Список исключений)`)
            else if (member.voice.mute)
                exceptions.push(`${member.user.tag} (${member}) (Уже замьючен)`)
            else {
                member.edit({mute: true})
                mutes.push(`${member.user.tag} (${member})`)
            }

        await message.channel.send(
            new MessageEmbed({
                description: "✅ Успешно!",
                fields: [{
                    name: "Замьюченные пользователи",
                    value: mutes.length ? mutes.join("\n") : "**Никого**"
                }, {
                    name: "Исключения",
                    value: exceptions.join('\n')
                }]
            })
        )
    }
}