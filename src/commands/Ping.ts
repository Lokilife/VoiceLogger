import { MessageEmbed } from "discord.js"
import { Command } from "../lib"
import { IHelp } from "../lib/command"

export default class PingCommand extends Command {
    public aliases: string[] = ["ping"]
    public help: IHelp = {
        name: "ping",
        description: "Задержки до API Discord'а",
        usage: "ping"
    }
    
    async exec({ channel }) {
        await channel.send(new MessageEmbed()
            .setTitle("Pong!")
            .setDescription(`\`\`\`\n${this.client.ws.ping}ms\n\`\`\``))
    }
}