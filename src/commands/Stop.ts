import { Command, Utils } from "../lib"
import { IHelp } from "../lib/command"

export default class StopCommand extends Command {
    public aliases: string[] = ["stop", "стоп", "выключить"]
    public help: IHelp = {
        name: "stop",
        description: "Отключает логирование голосовых каналов.",
        usage: "stop"
    }
    public ownerOnly: boolean = true
    
    async exec({ channel }) {
        try {
            this.client.logEnabled = false
            await Utils.DisableLog()
            await channel.send("✅ Логирование отключено!")
        } catch (e) {
            await channel.send("❌ При отключении логирования что-то пошло не так...")
            await channel.send(`Стек вызывов (обрезано до 1900 символов из-за ограничений Discord): ${e.stack.slice(0, 1900)}`)
        }
    }
}