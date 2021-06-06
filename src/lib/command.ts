import { Message } from "discord.js";
import Client from "./client";

interface ICommand {
    exec: any
    reload?: any
    remove?: any
}

export interface IHelp {
    name: string
    usage?: string
    description?: string
    category?: string
    hidden?: boolean
}

export default abstract class Command implements ICommand {
    /**
     * A client, which use command
     * @type {Client}
     */
    public client: Client

    /**
     * A aliases for command
     * @type {string[]}
     */
    public aliases: string[]

    /**
     * Whether or not this command is for owners only
     * @type {boolean}
     */
    public loggerAccessOnly: boolean = false
    
    /**
     * A object which contain info for help command
     * @type {IHelp}
     */
    public help: IHelp

    constructor(client: Client) {
        this.client = client
    }

    abstract exec(message: Message, args: string[])
}