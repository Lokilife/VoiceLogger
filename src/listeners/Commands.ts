import { ClientEvents, Message } from "discord.js"
import { Client, Listener } from "../lib"

export default class CommandsListener extends Listener {
    public type: keyof ClientEvents = "message"
    public id: string = "commands"
    public loggerAccessRoles: string[] = []

    constructor(client: Client) {
        super(client)
        for (const role of process.env.LOGGER_ACCESS_ROLES.split(","))
            this.loggerAccessRoles.push(role.trim()) 
    }

    async exec(message: Message) {
        if (!message.content.toLowerCase().startsWith(process.env.PREFIX)) return
        const messageArray = message.content.slice(process.env.PREFIX.length).split(/\s+/g)
        const name = messageArray[0].toLowerCase()
        const args = messageArray.slice(1)

        const command = this.client.getCommand(name)
        if (!command) return

        const roles = message.member.roles.cache.array()

        if (command.loggerAccessOnly) {
            var hasRole = false
            for (const role of roles.map(role => role.id)) {
                if (hasRole) break
                if (this.loggerAccessRoles.includes(role))
                    hasRole = true
            }
            if (!hasRole) return await message.channel.send("Для этой команды требуется особая роль, которой у вас нет.")
        }
        command.exec(message, args)
    }
}