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
            usage: "ping"
        };
    }
    async exec({ channel }) {
        await channel.send(new discord_js_1.MessageEmbed()
            .setTitle("Pong!")
            .setDescription(`\`\`\`\n${this.client.ws.ping}ms\n\`\`\``));
    }
}
exports.default = PingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9QaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXlDO0FBQ3pDLGdDQUFnQztBQUdoQyxNQUFxQixXQUFZLFNBQVEsYUFBTztJQUFoRDs7UUFDVyxZQUFPLEdBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM1QixTQUFJLEdBQVU7WUFDakIsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLEtBQUssRUFBRSxNQUFNO1NBQ2hCLENBQUE7SUFPTCxDQUFDO0lBTEcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRTtRQUNsQixNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBWSxFQUFFO2FBQ2hDLFFBQVEsQ0FBQyxPQUFPLENBQUM7YUFDakIsY0FBYyxDQUFDLFdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7Q0FDSjtBQWJELDhCQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZUVtYmVkIH0gZnJvbSBcImRpc2NvcmQuanNcIlxuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi9saWJcIlxuaW1wb3J0IHsgSUhlbHAgfSBmcm9tIFwiLi4vbGliL2NvbW1hbmRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaW5nQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICAgIHB1YmxpYyBhbGlhc2VzOiBzdHJpbmdbXSA9IFtcInBpbmdcIl1cbiAgICBwdWJsaWMgaGVscDogSUhlbHAgPSB7XG4gICAgICAgIG5hbWU6IFwicGluZ1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCLQl9Cw0LTQtdGA0LbQutC4INC00L4gQVBJIERpc2NvcmQn0LBcIixcbiAgICAgICAgdXNhZ2U6IFwicGluZ1wiXG4gICAgfVxuICAgIFxuICAgIGFzeW5jIGV4ZWMoeyBjaGFubmVsIH0pIHtcbiAgICAgICAgYXdhaXQgY2hhbm5lbC5zZW5kKG5ldyBNZXNzYWdlRW1iZWQoKVxuICAgICAgICAgICAgLnNldFRpdGxlKFwiUG9uZyFcIilcbiAgICAgICAgICAgIC5zZXREZXNjcmlwdGlvbihgXFxgXFxgXFxgXFxuJHt0aGlzLmNsaWVudC53cy5waW5nfW1zXFxuXFxgXFxgXFxgYCkpXG4gICAgfVxufSJdfQ==