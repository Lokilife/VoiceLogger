import Discord from "discord.js";
import Command from "./command";

export default class Client extends Discord.Client {
    public commands: Map<string, Command> = new Map()
    public logEnabled: boolean
    public logEnabledAt: Date
}