"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const lib_1 = require("../lib");
class PingCommand extends lib_1.Command {
    constructor() {
        super(...arguments);
        this.aliases = ["ping"];
        this.help = {
            name: "ping",
            description: "Задержки до API Discord'а",
            usage: "ping",
            category: "Разное"
        };
    }
    async exec({ channel }) {
        await channel.send(new discord_js_1.MessageEmbed()
            .setTitle("Pong!")
            .setDescription(`\`\`\`\n${this.client.ws.ping}ms\n\`\`\``));
    }
}
exports.default = PingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9QaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXlDO0FBQ3pDLGdDQUFnQztBQUdoQyxNQUFxQixXQUFZLFNBQVEsYUFBTztJQUFoRDs7UUFDVyxZQUFPLEdBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM1QixTQUFJLEdBQVU7WUFDakIsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLEtBQUssRUFBRSxNQUFNO1lBQ2IsUUFBUSxFQUFFLFFBQVE7U0FDckIsQ0FBQTtJQU9MLENBQUM7SUFMRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFO1FBQ2xCLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFZLEVBQUU7YUFDaEMsUUFBUSxDQUFDLE9BQU8sQ0FBQzthQUNqQixjQUFjLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUE7SUFDcEUsQ0FBQztDQUNKO0FBZEQsOEJBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlRW1iZWQgfSBmcm9tIFwiZGlzY29yZC5qc1wiXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL2xpYlwiXG5pbXBvcnQgeyBJSGVscCB9IGZyb20gXCIuLi9saWIvY29tbWFuZFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpbmdDb21tYW5kIGV4dGVuZHMgQ29tbWFuZCB7XG4gICAgcHVibGljIGFsaWFzZXM6IHN0cmluZ1tdID0gW1wicGluZ1wiXVxuICAgIHB1YmxpYyBoZWxwOiBJSGVscCA9IHtcbiAgICAgICAgbmFtZTogXCJwaW5nXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcItCX0LDQtNC10YDQttC60Lgg0LTQviBBUEkgRGlzY29yZCfQsFwiLFxuICAgICAgICB1c2FnZTogXCJwaW5nXCIsXG4gICAgICAgIGNhdGVnb3J5OiBcItCg0LDQt9C90L7QtVwiXG4gICAgfVxuICAgIFxuICAgIGFzeW5jIGV4ZWMoeyBjaGFubmVsIH0pIHtcbiAgICAgICAgYXdhaXQgY2hhbm5lbC5zZW5kKG5ldyBNZXNzYWdlRW1iZWQoKVxuICAgICAgICAgICAgLnNldFRpdGxlKFwiUG9uZyFcIilcbiAgICAgICAgICAgIC5zZXREZXNjcmlwdGlvbihgXFxgXFxgXFxgXFxuJHt0aGlzLmNsaWVudC53cy5waW5nfW1zXFxuXFxgXFxgXFxgYCkpXG4gICAgfVxufSJdfQ==