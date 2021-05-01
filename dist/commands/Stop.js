"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
class StopCommand extends lib_1.Command {
    constructor() {
        super(...arguments);
        this.aliases = ["stop", "стоп", "выключить"];
        this.help = {
            name: "stop",
            description: "Отключает логирование голосовых каналов.",
            usage: "stop"
        };
        this.ownerOnly = true;
    }
    async exec({ channel }) {
        try {
            this.client.logEnabled = false;
            await lib_1.Utils.DisableLog();
            await channel.send("✅ Логирование отключено!");
        }
        catch (e) {
            await channel.send("❌ При отключении логирования что-то пошло не так...");
            await channel.send(`Стек вызывов (обрезано до 1900 символов из-за ограничений Discord): ${e.stack.slice(0, 1900)}`);
        }
    }
}
exports.default = StopCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9TdG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQXVDO0FBR3ZDLE1BQXFCLFdBQVksU0FBUSxhQUFPO0lBQWhEOztRQUNXLFlBQU8sR0FBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDakQsU0FBSSxHQUFVO1lBQ2pCLElBQUksRUFBRSxNQUFNO1lBQ1osV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxLQUFLLEVBQUUsTUFBTTtTQUNoQixDQUFBO1FBQ00sY0FBUyxHQUFZLElBQUksQ0FBQTtJQVlwQyxDQUFDO0lBVkcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRTtRQUNsQixJQUFJO1lBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFBO1lBQzlCLE1BQU0sV0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3hCLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO1NBQ2pEO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUMsQ0FBQTtZQUN6RSxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUVBQXVFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDdEg7SUFDTCxDQUFDO0NBQ0o7QUFuQkQsOEJBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZCwgVXRpbHMgfSBmcm9tIFwiLi4vbGliXCJcbmltcG9ydCB7IElIZWxwIH0gZnJvbSBcIi4uL2xpYi9jb21tYW5kXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcENvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgICBwdWJsaWMgYWxpYXNlczogc3RyaW5nW10gPSBbXCJzdG9wXCIsIFwi0YHRgtC+0L9cIiwgXCLQstGL0LrQu9GO0YfQuNGC0YxcIl1cbiAgICBwdWJsaWMgaGVscDogSUhlbHAgPSB7XG4gICAgICAgIG5hbWU6IFwic3RvcFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCLQntGC0LrQu9GO0YfQsNC10YIg0LvQvtCz0LjRgNC+0LLQsNC90LjQtSDQs9C+0LvQvtGB0L7QstGL0YUg0LrQsNC90LDQu9C+0LIuXCIsXG4gICAgICAgIHVzYWdlOiBcInN0b3BcIlxuICAgIH1cbiAgICBwdWJsaWMgb3duZXJPbmx5OiBib29sZWFuID0gdHJ1ZVxuICAgIFxuICAgIGFzeW5jIGV4ZWMoeyBjaGFubmVsIH0pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmxvZ0VuYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgYXdhaXQgVXRpbHMuRGlzYWJsZUxvZygpXG4gICAgICAgICAgICBhd2FpdCBjaGFubmVsLnNlbmQoXCLinIUg0JvQvtCz0LjRgNC+0LLQsNC90LjQtSDQvtGC0LrQu9GO0YfQtdC90L4hXCIpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGF3YWl0IGNoYW5uZWwuc2VuZChcIuKdjCDQn9GA0Lgg0L7RgtC60LvRjtGH0LXQvdC40Lgg0LvQvtCz0LjRgNC+0LLQsNC90LjRjyDRh9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6Li4uXCIpXG4gICAgICAgICAgICBhd2FpdCBjaGFubmVsLnNlbmQoYNCh0YLQtdC6INCy0YvQt9GL0LLQvtCyICjQvtCx0YDQtdC30LDQvdC+INC00L4gMTkwMCDRgdC40LzQstC+0LvQvtCyINC40Lct0LfQsCDQvtCz0YDQsNC90LjRh9C10L3QuNC5IERpc2NvcmQpOiAke2Uuc3RhY2suc2xpY2UoMCwgMTkwMCl9YClcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=