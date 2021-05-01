import { Client, Listener } from "../lib"

export default class ReadyListener extends Listener {
    public type: EventTypes = "ready"
    public id: string = "ready"
    
    async exec() {
        console.log(`Logged on Discord as ${this.client.user.tag}(${this.client.user.id})!`)
    }
}