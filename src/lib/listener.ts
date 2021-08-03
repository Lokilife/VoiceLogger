import { ClientEvents } from 'discord.js'
import Client from './client'

interface IListener {
    exec: any
    reload?: any
    remove?: any
}

export default abstract class Listener implements IListener {
    /**
     * A client, which use listener
     * @type {Client}
     */
    public client: Client
    /**
     * A type of event
     * @type {EventTypes}
     */
    public type: keyof ClientEvents
    /**
     * Unique listener ID
     * @type {string}.
     */
    public id: string

    constructor (client: Client) {
      this.client = client
    }

    abstract exec(...args)
}
