"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const lib_1 = require("../lib");
const voice_log_1 = __importDefault(require("../models/voice-log"));
class PingCommand extends lib_1.Command {
    constructor() {
        super(...arguments);
        this.aliases = ["stats", "stat", "статы", "стат", "статистика"];
        this.help = {
            name: "stats",
            description: "Статистика входов/выходов в войсах.",
            usage: "stats"
        };
        this.ownerOnly = true;
    }
    async exec({ channel, guild }) {
        const channels = await voice_log_1.default.find().exec();
        const dateSortedChannels = new Map();
        const embed = new discord_js_1.MessageEmbed();
        let joinLeaveCounter = 0;
        for (const channel of channels) {
            const key = `От ${channel.logEnabledAt.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} ` +
                `до ${channel.logDisabledAt.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }) || "{Логирование не завершено}}"}`;
            const prev = dateSortedChannels.get(key);
            dateSortedChannels.set(key, [channel]);
            if (prev)
                dateSortedChannels.set(key, [channel, ...prev[key]]);
        }
        for (const [date, channels] of dateSortedChannels) {
            const name = `__**${date}:**__\n`;
            let value;
            for (const channel of channels)
                for (const user of channel.users) {
                    joinLeaveCounter++;
                    const member = guild.members.cache.get(user.id);
                    const channelName = guild.channels.cache.get(channel.channelID).name;
                    value =
                        `🔉 Канал: #${channelName}\n` +
                            `👨 Пользователь: ${member} (${member.user.tag})\n` +
                            `✅ Вошёл: ${user.joinedAt.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}\n` +
                            `❌ Вышел: ${user.leavedAt.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }) || "{Время выхода из канала не зафиксировано}"}\n\n`;
                }
            embed.addField(name, value, false);
        }
        embed.setTitle(`Время указано по МСК`);
        embed.setDescription(`Общее количество зафиксированных входов/выходов: ${joinLeaveCounter}`);
        embed.setColor("2f3136");
        channel.send(embed);
    }
}
exports.default = PingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvU3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQ0FBeUM7QUFDekMsZ0NBQWdDO0FBRWhDLG9FQUEwQztBQUkxQyxNQUFxQixXQUFZLFNBQVEsYUFBTztJQUFoRDs7UUFDVyxZQUFPLEdBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFDcEUsU0FBSSxHQUFVO1lBQ2pCLElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxLQUFLLEVBQUUsT0FBTztTQUNqQixDQUFBO1FBQ00sY0FBUyxHQUFZLElBQUksQ0FBQTtJQXVDcEMsQ0FBQztJQXJDRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtRQUN6QixNQUFNLFFBQVEsR0FBRyxNQUFNLG1CQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDN0MsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRSxDQUFBO1FBQ2hDLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFBO1FBQ3hCLEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFO1lBQzVCLE1BQU0sR0FBRyxHQUNULE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDLEdBQUc7Z0JBQ2xGLE1BQU0sT0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDLElBQUksNkJBQTZCLEVBQUUsQ0FBQTtZQUVuSCxNQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDeEMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7WUFDdEMsSUFBSSxJQUFJO2dCQUNKLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQzNEO1FBRUQsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixFQUFFO1lBQy9DLE1BQU0sSUFBSSxHQUFHLE9BQU8sSUFBSSxTQUFTLENBQUE7WUFDakMsSUFBSSxLQUFhLENBQUE7WUFDakIsS0FBSyxNQUFNLE9BQU8sSUFBSSxRQUFRO2dCQUMxQixLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQzlCLGdCQUFnQixFQUFFLENBQUE7b0JBQ2xCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQy9DLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFBO29CQUNwRSxLQUFLO3dCQUNMLGNBQWMsV0FBVyxJQUFJOzRCQUM3QixvQkFBb0IsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLOzRCQUNuRCxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FBQyxJQUFJOzRCQUNsRixZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FBQyxJQUFJLDJDQUEyQyxNQUFNLENBQUE7aUJBQ3RJO1lBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQ3JDO1FBQ0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQ3RDLEtBQUssQ0FBQyxjQUFjLENBQUMsb0RBQW9ELGdCQUFnQixFQUFFLENBQUMsQ0FBQTtRQUM1RixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkIsQ0FBQztDQUNKO0FBOUNELDhCQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2VFbWJlZCB9IGZyb20gXCJkaXNjb3JkLmpzXCJcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vbGliXCJcbmltcG9ydCB7IElIZWxwIH0gZnJvbSBcIi4uL2xpYi9jb21tYW5kXCJcbmltcG9ydCBWb2ljZUxvZyBmcm9tIFwiLi4vbW9kZWxzL3ZvaWNlLWxvZ1wiXG5cbi8vINCX0LTQtdGB0Ywg0LLQvtC30LzQvtC20LXQvSDQs9C60L7QtCwg0LTQtdC70LDQuyDRjdGC0L4g0YPQttC1INCyIDIg0L3QvtGH0Lgg0Lgg0YEg0L/QvtC00L7QsdC90YvQvNC4INC30LDQtNCw0YfQsNC80Lgg0YMg0LzQtdC90Y8g0LLRgdC10LPQtNCwINCx0YvQu9C4INC/0YDQvtCx0LvQtdC80Ytcbi8vINCd0LDQuNCx0L7Qu9C10LUg0LLQtdGA0L7Rj9GC0L3Qviwg0YfRgtC+INC00LDQttC1INC00YDRg9Cz0L7QuSDQtNC20YPQvSDRgdC80L7QttC10YIg0Y3RgtC+INGB0LTQtdC70LDRgtGMINC70YPRh9GI0LUg0LzQtdC90Y8uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaW5nQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICAgIHB1YmxpYyBhbGlhc2VzOiBzdHJpbmdbXSA9IFtcInN0YXRzXCIsIFwic3RhdFwiLCBcItGB0YLQsNGC0YtcIiwgXCLRgdGC0LDRglwiLCBcItGB0YLQsNGC0LjRgdGC0LjQutCwXCJdXG4gICAgcHVibGljIGhlbHA6IElIZWxwID0ge1xuICAgICAgICBuYW1lOiBcInN0YXRzXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcItCh0YLQsNGC0LjRgdGC0LjQutCwINCy0YXQvtC00L7Qsi/QstGL0YXQvtC00L7QsiDQsiDQstC+0LnRgdCw0YUuXCIsXG4gICAgICAgIHVzYWdlOiBcInN0YXRzXCJcbiAgICB9XG4gICAgcHVibGljIG93bmVyT25seTogYm9vbGVhbiA9IHRydWVcblxuICAgIGFzeW5jIGV4ZWMoeyBjaGFubmVsLCBndWlsZCB9KSB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxzID0gYXdhaXQgVm9pY2VMb2cuZmluZCgpLmV4ZWMoKVxuICAgICAgICBjb25zdCBkYXRlU29ydGVkQ2hhbm5lbHMgPSBuZXcgTWFwKClcbiAgICAgICAgY29uc3QgZW1iZWQgPSBuZXcgTWVzc2FnZUVtYmVkKClcbiAgICAgICAgbGV0IGpvaW5MZWF2ZUNvdW50ZXIgPSAwXG4gICAgICAgIGZvciAoY29uc3QgY2hhbm5lbCBvZiBjaGFubmVscykge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gXG4gICAgICAgICAgICBg0J7RgiAke2NoYW5uZWwubG9nRW5hYmxlZEF0LnRvTG9jYWxlU3RyaW5nKCdydS1SVScsIHt0aW1lWm9uZTogJ0V1cm9wZS9Nb3Njb3cnfSl9IGAgKyBcbiAgICAgICAgICAgIGDQtNC+ICR7Y2hhbm5lbC5sb2dEaXNhYmxlZEF0LnRvTG9jYWxlU3RyaW5nKCdydS1SVScsIHt0aW1lWm9uZTogJ0V1cm9wZS9Nb3Njb3cnfSkgfHwgXCJ70JvQvtCz0LjRgNC+0LLQsNC90LjQtSDQvdC1INC30LDQstC10YDRiNC10L3Qvn19XCJ9YFxuXG4gICAgICAgICAgICBjb25zdCBwcmV2ID0gZGF0ZVNvcnRlZENoYW5uZWxzLmdldChrZXkpXG4gICAgICAgICAgICBkYXRlU29ydGVkQ2hhbm5lbHMuc2V0KGtleSwgW2NoYW5uZWxdKVxuICAgICAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICAgICAgZGF0ZVNvcnRlZENoYW5uZWxzLnNldChrZXksIFtjaGFubmVsLCAuLi5wcmV2W2tleV1dKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGNvbnN0IFtkYXRlLCBjaGFubmVsc10gb2YgZGF0ZVNvcnRlZENoYW5uZWxzKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gYF9fKioke2RhdGV9OioqX19cXG5gXG4gICAgICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyBcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbm5lbCBvZiBjaGFubmVscylcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHVzZXIgb2YgY2hhbm5lbC51c2Vycykge1xuICAgICAgICAgICAgICAgICAgICBqb2luTGVhdmVDb3VudGVyKytcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVtYmVyID0gZ3VpbGQubWVtYmVycy5jYWNoZS5nZXQodXNlci5pZClcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbm5lbE5hbWUgPSBndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoY2hhbm5lbC5jaGFubmVsSUQpLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICBg8J+UiSDQmtCw0L3QsNC7OiAjJHtjaGFubmVsTmFtZX1cXG5gICtcbiAgICAgICAgICAgICAgICAgICAgYPCfkagg0J/QvtC70YzQt9C+0LLQsNGC0LXQu9GMOiAke21lbWJlcn0gKCR7bWVtYmVyLnVzZXIudGFnfSlcXG5gICtcbiAgICAgICAgICAgICAgICAgICAgYOKchSDQktC+0YjRkdC7OiAke3VzZXIuam9pbmVkQXQudG9Mb2NhbGVTdHJpbmcoJ3J1LVJVJywge3RpbWVab25lOiAnRXVyb3BlL01vc2Nvdyd9KX1cXG5gICtcbiAgICAgICAgICAgICAgICAgICAgYOKdjCDQktGL0YjQtdC7OiAke3VzZXIubGVhdmVkQXQudG9Mb2NhbGVTdHJpbmcoJ3J1LVJVJywge3RpbWVab25lOiAnRXVyb3BlL01vc2Nvdyd9KSB8fCBcInvQktGA0LXQvNGPINCy0YvRhdC+0LTQsCDQuNC3INC60LDQvdCw0LvQsCDQvdC1INC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC+fVwifVxcblxcbmBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBlbWJlZC5hZGRGaWVsZChuYW1lLCB2YWx1ZSwgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgZW1iZWQuc2V0VGl0bGUoYNCS0YDQtdC80Y8g0YPQutCw0LfQsNC90L4g0L/QviDQnNCh0JpgKVxuICAgICAgICBlbWJlZC5zZXREZXNjcmlwdGlvbihg0J7QsdGJ0LXQtSDQutC+0LvQuNGH0LXRgdGC0LLQviDQt9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvdGL0YUg0LLRhdC+0LTQvtCyL9Cy0YvRhdC+0LTQvtCyOiAke2pvaW5MZWF2ZUNvdW50ZXJ9YClcbiAgICAgICAgZW1iZWQuc2V0Q29sb3IoXCIyZjMxMzZcIilcbiAgICAgICAgY2hhbm5lbC5zZW5kKGVtYmVkKVxuICAgIH1cbn0iXX0=