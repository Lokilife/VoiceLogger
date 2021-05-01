import { Message } from "discord.js"
import { Client, Listener } from "../lib"

export default class CommandsListener extends Listener {
    public type: EventTypes = "message"
    public id: string = "commands"
    public owners: string[] = []

    constructor(client: Client) {
        super(client)
        for (const owner of process.env.OWNERS.split(","))
            this.owners.push(owner.trim()) 
    }

    async exec(message: Message) {
        if (!message.content.startsWith(process.env.PREFIX)) return
        const messageArray = message.content.split(/\s+/g)
        const name = messageArray[0].slice(process.env.PREFIX.length)
        const args = messageArray.slice(1)

        const command = this.client.commands.get(name)
        if (!command) return

        if (command.ownerOnly && !this.owners.includes(message.author.id))
            return message.channel.send("Данную команду могут использовать только владельцы, в списке которых вы не числитесь.")
        
        command.exec(message, args)
    }
}