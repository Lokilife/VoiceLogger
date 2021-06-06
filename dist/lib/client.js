"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const discord_js_1 = __importDefault(require("discord.js"));
const path_1 = require("path");
const LogEnabled = JSON.parse(fs_1.readFileSync(path_1.join(__dirname, "..", "..", "LogEnabled.json")).toString());
class Client extends discord_js_1.default.Client {
    constructor() {
        super(...arguments);
        this.commands = [];
        this.logEnabled = LogEnabled;
        this.logEnabledAt = LogEnabled ? new Date() : null;
        this.enabledMode = null;
    }
    getCommand(name) {
        for (const command of this.commands)
            if (command.aliases.includes(name.toLowerCase()))
                return command;
    }
}
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBaUM7QUFDakMsNERBQWdDO0FBRWhDLCtCQUEyQjtBQUUzQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFZLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBRXRHLE1BQXFCLE1BQU8sU0FBUSxvQkFBTyxDQUFDLE1BQU07SUFBbEQ7O1FBQ1csYUFBUSxHQUFtQixFQUFFLENBQUE7UUFDN0IsZUFBVSxHQUFZLFVBQVUsQ0FBQTtRQUNoQyxpQkFBWSxHQUFTLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1FBQ25ELGdCQUFXLEdBQVcsSUFBSSxDQUFBO0lBT3JDLENBQUM7SUFMRyxVQUFVLENBQUMsSUFBWTtRQUNuQixLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQy9CLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM1QyxPQUFPLE9BQU8sQ0FBQTtJQUMxQixDQUFDO0NBQ0o7QUFYRCx5QkFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiXG5pbXBvcnQgRGlzY29yZCBmcm9tIFwiZGlzY29yZC5qc1wiXG5pbXBvcnQgQ29tbWFuZCBmcm9tIFwiLi9jb21tYW5kXCJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiXG5cbmNvbnN0IExvZ0VuYWJsZWQgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhqb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcIi4uXCIsIFwiTG9nRW5hYmxlZC5qc29uXCIpKS50b1N0cmluZygpKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnQgZXh0ZW5kcyBEaXNjb3JkLkNsaWVudCB7XG4gICAgcHVibGljIGNvbW1hbmRzOiBBcnJheTxDb21tYW5kPiA9IFtdXG4gICAgcHVibGljIGxvZ0VuYWJsZWQ6IGJvb2xlYW4gPSBMb2dFbmFibGVkXG4gICAgcHVibGljIGxvZ0VuYWJsZWRBdDogRGF0ZSA9IExvZ0VuYWJsZWQgPyBuZXcgRGF0ZSgpIDogbnVsbFxuICAgIHB1YmxpYyBlbmFibGVkTW9kZTogc3RyaW5nID0gbnVsbFxuXG4gICAgZ2V0Q29tbWFuZChuYW1lOiBzdHJpbmcpOiBDb21tYW5kIHtcbiAgICAgICAgZm9yIChjb25zdCBjb21tYW5kIG9mIHRoaXMuY29tbWFuZHMpXG4gICAgICAgICAgICBpZiAoY29tbWFuZC5hbGlhc2VzLmluY2x1ZGVzKG5hbWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRcbiAgICB9XG59Il19