import { ClientEvents } from "discord.js"
import { Listener } from "../lib"

export default class ReadyListener extends Listener {
    public type: keyof ClientEvents = "ready"
    public id: string = "ready"
    
    async exec() {
        console.log(`Logged on Discord as ${this.client.user.tag}(${this.client.user.id})!`)
        this.client.enabledMode = require('../../LogEnabled.json')
    }
}