import { Message, MessageEmbed } from "discord.js"
import { Command } from "../lib"
import { IHelp } from "../lib/command"

export default class HelpCommand extends Command {
    public aliases: string[] = ["help"]
    public help: IHelp = {
        name: "help",
        description: "Покажет это сообщение",
        usage: "help [команда]",
        category: "Разное",
        hidden: true
    }
    
    async exec(message: Message, [commandName]) {
        if (!commandName) {
            var fields = new Map()

            for (const command of this.client.commands) {
                if (command.help.hidden) continue
                const list = fields.get(command.help.category)
                fields.set(command.help.category, list ? [command.help.name, ...list] : [command.help.name])
            }

            await message.channel.send(new MessageEmbed({
                author: {
                    name: "Список доступных команд",
                    iconURL: message.author.displayAvatarURL()
                },
                color: 0x2F3136,
                fields: Array.from(fields, ([name, value]) => ({ name, value: `\`${value.join('`, `')}\`` }))
            }))
            return
        }

        const command = this.client.getCommand(commandName)        
        if (!command) return await this.exec(message, [""])
        const description =  `**Название:** \`${command.help.name}\`\n` +
                             `**Псевдонимы:** \`${command.aliases.join(', ')}\`\n` +
                             `**Использование:** \`${command.help.usage}\`\n` +
                             `**Описание:** \`${command.help.description}\`\n` +
                             `**Требует доступ к логированию:** \`${command.loggerAccessOnly}\`\n`
        
        await message.channel.send(new MessageEmbed({
            description,
            color: 0x2F3136,
            author: {
                name: `Справка по команде ${command.help.name}`,
                iconURL: message.author.displayAvatarURL()
            }
        }))
    }
}