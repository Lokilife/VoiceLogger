"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
class ReadyListener extends lib_1.Listener {
    constructor() {
        super(...arguments);
        this.type = "ready";
        this.id = "ready";
    }
    async exec() {
        console.log(`Logged on Discord as ${this.client.user.tag}(${this.client.user.id})!`);
    }
}
exports.default = ReadyListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlzdGVuZXJzL1JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQXlDO0FBRXpDLE1BQXFCLGFBQWMsU0FBUSxjQUFRO0lBQW5EOztRQUNXLFNBQUksR0FBZSxPQUFPLENBQUE7UUFDMUIsT0FBRSxHQUFXLE9BQU8sQ0FBQTtJQUsvQixDQUFDO0lBSEcsS0FBSyxDQUFDLElBQUk7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN4RixDQUFDO0NBQ0o7QUFQRCxnQ0FPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWVudCwgTGlzdGVuZXIgfSBmcm9tIFwiLi4vbGliXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhZHlMaXN0ZW5lciBleHRlbmRzIExpc3RlbmVyIHtcbiAgICBwdWJsaWMgdHlwZTogRXZlbnRUeXBlcyA9IFwicmVhZHlcIlxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gXCJyZWFkeVwiXG4gICAgXG4gICAgYXN5bmMgZXhlYygpIHtcbiAgICAgICAgY29uc29sZS5sb2coYExvZ2dlZCBvbiBEaXNjb3JkIGFzICR7dGhpcy5jbGllbnQudXNlci50YWd9KCR7dGhpcy5jbGllbnQudXNlci5pZH0pIWApXG4gICAgfVxufSJdfQ==