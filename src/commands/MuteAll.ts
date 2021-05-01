import { GuildMember, Message } from "discord.js"
import { Command } from "../lib"
import { IHelp } from "../lib/command"

export default class StopCommand extends Command {
    public aliases: string[] = ["muteall", "mute_all", "mutevoice", "mute_voice"]
    public help: IHelp = {
        name: "mute_all",
        description: "Мьютит всех в пользователей в голосовом канале.\nТребует право мьютить в голосовом канале в котором вы находитесь.",
        usage: "mute_all"
    }
    
    async exec(message: Message) {
        const channel = message.member.voice.channel,
              guild = message.guild
        
        if (!channel)
            return await message.channel.send("❌ Не пытайся меня обмануть, я знаю что ты не в войсе :)")
        
        if (!channel.permissionsFor(message.member).has("MUTE_MEMBERS"))
            return await message.channel.send("❌ Ну не пытайся обмануть меня, я ведь прекрасно вижу что у тебя нет прав мьютить в этом канале :(")

        if (!channel.permissionsFor(guild.me).has("MUTE_MEMBERS"))
            return await message.channel.send("❌ Я бы хотел сказать что у тебя нет прав мьютить, но сейчас нет прав у меня(")

        for (const [id, member] of channel.members) {
            if (id == message.author.id) continue
            await member.edit({mute: true})
        }
    }
}