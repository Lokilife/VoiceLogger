"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
class StartCommand extends lib_1.Command {
    constructor() {
        super(...arguments);
        this.aliases = ["start", "старт", "включить", "запустить"];
        this.help = {
            name: "start",
            description: "Запускает логирование всех входов и выходов в голосовых каналах что указаны в конфиге бота.",
            usage: "start"
        };
        this.ownerOnly = true;
    }
    async exec({ channel }) {
        try {
            this.client.logEnabled = true;
            this.client.logEnabledAt = new Date();
            await channel.send("✅ Логирование запущено!");
        }
        catch (e) {
            await channel.send("❌ При запуске логирования что-то пошло не так...");
            await channel.send(`Стек вызывов (обрезано до 1900 символов из-за ограничений Discord): ${e.stack.slice(0, 1900)}`);
        }
    }
}
exports.default = StartCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvU3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnQ0FBZ0M7QUFHaEMsTUFBcUIsWUFBYSxTQUFRLGFBQU87SUFBakQ7O1FBQ1csWUFBTyxHQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDL0QsU0FBSSxHQUFVO1lBQ2pCLElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLDZGQUE2RjtZQUMxRyxLQUFLLEVBQUUsT0FBTztTQUNqQixDQUFBO1FBQ00sY0FBUyxHQUFZLElBQUksQ0FBQTtJQVlwQyxDQUFDO0lBVkcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRTtRQUNsQixJQUFJO1lBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7WUFDckMsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUE7U0FDaEQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO1lBQ3RFLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUN0SDtJQUNMLENBQUM7Q0FDSjtBQW5CRCwrQkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL2xpYlwiXG5pbXBvcnQgeyBJSGVscCB9IGZyb20gXCIuLi9saWIvY29tbWFuZFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0Q29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICAgIHB1YmxpYyBhbGlhc2VzOiBzdHJpbmdbXSA9IFtcInN0YXJ0XCIsIFwi0YHRgtCw0YDRglwiLCBcItCy0LrQu9GO0YfQuNGC0YxcIiwgXCLQt9Cw0L/Rg9GB0YLQuNGC0YxcIl1cbiAgICBwdWJsaWMgaGVscDogSUhlbHAgPSB7XG4gICAgICAgIG5hbWU6IFwic3RhcnRcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwi0JfQsNC/0YPRgdC60LDQtdGCINC70L7Qs9C40YDQvtCy0LDQvdC40LUg0LLRgdC10YUg0LLRhdC+0LTQvtCyINC4INCy0YvRhdC+0LTQvtCyINCyINCz0L7Qu9C+0YHQvtCy0YvRhSDQutCw0L3QsNC70LDRhSDRh9GC0L4g0YPQutCw0LfQsNC90Ysg0LIg0LrQvtC90YTQuNCz0LUg0LHQvtGC0LAuXCIsXG4gICAgICAgIHVzYWdlOiBcInN0YXJ0XCJcbiAgICB9XG4gICAgcHVibGljIG93bmVyT25seTogYm9vbGVhbiA9IHRydWVcblxuICAgIGFzeW5jIGV4ZWMoeyBjaGFubmVsIH0pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmxvZ0VuYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5sb2dFbmFibGVkQXQgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICBhd2FpdCBjaGFubmVsLnNlbmQoXCLinIUg0JvQvtCz0LjRgNC+0LLQsNC90LjQtSDQt9Cw0L/Rg9GJ0LXQvdC+IVwiKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhd2FpdCBjaGFubmVsLnNlbmQoXCLinYwg0J/RgNC4INC30LDQv9GD0YHQutC1INC70L7Qs9C40YDQvtCy0LDQvdC40Y8g0YfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQui4uLlwiKVxuICAgICAgICAgICAgYXdhaXQgY2hhbm5lbC5zZW5kKGDQodGC0LXQuiDQstGL0LfRi9Cy0L7QsiAo0L7QsdGA0LXQt9Cw0L3QviDQtNC+IDE5MDAg0YHQuNC80LLQvtC70L7QsiDQuNC3LdC30LAg0L7Qs9GA0LDQvdC40YfQtdC90LjQuSBEaXNjb3JkKTogJHtlLnN0YWNrLnNsaWNlKDAsIDE5MDApfWApXG4gICAgICAgIH1cbiAgICB9XG59Il19