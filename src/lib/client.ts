import { readFileSync } from "fs"
import Discord from "discord.js"
import Command from "./command"
import { join } from "path"

const LogEnabled = JSON.parse(readFileSync(join(__dirname, "..", "..", "LogEnabled.json")).toString())

export default class Client extends Discord.Client {
    public commands: Array<Command> = []
    public logEnabled: boolean = LogEnabled
    public logEnabledAt: Date = LogEnabled ? new Date() : null
    public enabledMode: string = null

    getCommand(name: string): Command {
        for (const command of this.commands)
            if (command.aliases.includes(name.toLowerCase()))
                return command
    }
}