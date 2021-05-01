"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
class Client extends discord_js_1.default.Client {
    constructor() {
        super(...arguments);
        this.commands = new Map();
    }
}
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBaUM7QUFHakMsTUFBcUIsTUFBTyxTQUFRLG9CQUFPLENBQUMsTUFBTTtJQUFsRDs7UUFDVyxhQUFRLEdBQXlCLElBQUksR0FBRyxFQUFFLENBQUE7SUFHckQsQ0FBQztDQUFBO0FBSkQseUJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlzY29yZCBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IENvbW1hbmQgZnJvbSBcIi4vY29tbWFuZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnQgZXh0ZW5kcyBEaXNjb3JkLkNsaWVudCB7XG4gICAgcHVibGljIGNvbW1hbmRzOiBNYXA8c3RyaW5nLCBDb21tYW5kPiA9IG5ldyBNYXAoKVxuICAgIHB1YmxpYyBsb2dFbmFibGVkOiBib29sZWFuXG4gICAgcHVibGljIGxvZ0VuYWJsZWRBdDogRGF0ZVxufSJdfQ==