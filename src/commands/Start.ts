import { IHelp } from "../lib/command"
import { Message } from "discord.js"
import { writeFileSync } from "fs"
import { Command } from "../lib"
import { join } from "path"

const modes: string[] = process.env.LOGGER_MODES
    .split(',')
    .map(e => e.trim())
    .filter(e => !!e)

export default class StartCommand extends Command {
    public aliases: string[] = ["start", "старт", "включить", "запустить"]
    public help: IHelp = {
        name: "start",
        description: "Запускает логирование всех входов и выходов в голосовых каналах что указаны в конфиге бота.",
        usage: "start",
        category: "Логирование"
    }
    public loggerAccessOnly: boolean = true

    async exec({ channel }: Message, [...modeArr]: string[]) {
        const mode = modeArr.join(' ')
        if (this.client.logEnabled)
            return await channel.send("❌ Логирование уже запущено!")

        if (!mode || !modes.includes(mode.trim()))
            return await channel.send(`Режима \`${mode || "Не указан"}\` не существует в текущем конфиге.\n` + 
                                      `Доступные режимы: \`${modes.join('`, `')}\``)

        try {
            writeFileSync(join(__dirname, '..', '..', 'LogEnabled.json'), `"${mode}"`)
            this.client.logEnabled = true
            this.client.logEnabledAt = new Date()
            this.client.enabledMode = mode

            await channel.send("✅ Логирование запущено!")
        } catch (e) {
            await channel.send("❌ При запуске логирования что-то пошло не так...")
            await channel.send(`Стек вызывов (обрезано до 1900 символов из-за ограничений Discord): ${e.stack.slice(0, 1900)}`)
        }
    }
}