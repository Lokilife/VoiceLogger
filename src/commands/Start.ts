import { Command } from "../lib"
import { IHelp } from "../lib/command"

export default class StartCommand extends Command {
    public aliases: string[] = ["start", "старт", "включить", "запустить"]
    public help: IHelp = {
        name: "start",
        description: "Запускает логирование всех входов и выходов в голосовых каналах что указаны в конфиге бота.",
        usage: "start"
    }
    public ownerOnly: boolean = true

    async exec({ channel }) {
        try {
            this.client.logEnabled = true
            this.client.logEnabledAt = new Date()
            await channel.send("✅ Логирование запущено!")
        } catch (e) {
            await channel.send("❌ При запуске логирования что-то пошло не так...")
            await channel.send(`Стек вызывов (обрезано до 1900 символов из-за ограничений Discord): ${e.stack.slice(0, 1900)}`)
        }
    }
}