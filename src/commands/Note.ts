import { Message } from "discord.js"
import { Command } from "../lib"
import { IHelp } from "../lib/command"
import { AddOrGetUser, GetDate, isDate } from "../lib/utils"
import Session from "../models/session"
import Users from "../models/user"

const modes: string[] = process.env.LOGGER_MODES
    .split(',')
    .map(e => e.trim())
    .filter(e => !!e)

export default class NoteCommand extends Command {
    public aliases: string[] = ["note"]
    public help: IHelp = {
        name: "note",
        description: "Установить заметку на участнике\nУкажите ничего, чтобы удалить.",
        usage: "note <Участник> <Режим> | [Заметка]",
        category: "Разное"
    }    
    public loggerAccessOnly: boolean = true

    async exec({ channel, mentions }: Message, [date, ...modeAndNoteArr]: string[]) {
        let [mode, note] = modeAndNoteArr.join(' ').split('|')

        const member    = mentions.members.first()
              mode      = mode ? mode.trim() : "Неизвестно",
              note      = note ? note.trim() : "[ Информация о данном SCP удалена ]"

        if (!modes.includes(mode))
            return await channel.send(`Режима \`${mode}\` не существует в текущем конфиге.\n` + 
                                      `Доступные режимы: \`${modes.join('`, `')}\``)
        
        if (member) {
            await AddOrGetUser(member, mode)
            await Users.updateOne({userID: member.id, logMode: mode}, {$set: {note}}).exec()
        } else if (isDate(date)) {
            await channel.send("Comming Soon!")
            return
            const session = Session.findOne({startedAt: GetDate(date)})
            await Session
        }
        
        else 
            return await channel.send("❌ И у кого я по твоему должен изменить заметку?\nP. s. Используй упомянания чтобы указать пользователя.")

        await channel.send("✅ Заметка установленна!")
    }
}