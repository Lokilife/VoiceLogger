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
        this.client.enabledMode = require('../../LogEnabled.json');
    }
}
exports.default = ReadyListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGlzdGVuZXJzL1JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsZ0NBQWlDO0FBRWpDLE1BQXFCLGFBQWMsU0FBUSxjQUFRO0lBQW5EOztRQUNXLFNBQUksR0FBdUIsT0FBTyxDQUFBO1FBQ2xDLE9BQUUsR0FBVyxPQUFPLENBQUE7SUFNL0IsQ0FBQztJQUpHLEtBQUssQ0FBQyxJQUFJO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDcEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUE7SUFDOUQsQ0FBQztDQUNKO0FBUkQsZ0NBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnRFdmVudHMgfSBmcm9tIFwiZGlzY29yZC5qc1wiXG5pbXBvcnQgeyBMaXN0ZW5lciB9IGZyb20gXCIuLi9saWJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFkeUxpc3RlbmVyIGV4dGVuZHMgTGlzdGVuZXIge1xuICAgIHB1YmxpYyB0eXBlOiBrZXlvZiBDbGllbnRFdmVudHMgPSBcInJlYWR5XCJcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IFwicmVhZHlcIlxuICAgIFxuICAgIGFzeW5jIGV4ZWMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBMb2dnZWQgb24gRGlzY29yZCBhcyAke3RoaXMuY2xpZW50LnVzZXIudGFnfSgke3RoaXMuY2xpZW50LnVzZXIuaWR9KSFgKVxuICAgICAgICB0aGlzLmNsaWVudC5lbmFibGVkTW9kZSA9IHJlcXVpcmUoJy4uLy4uL0xvZ0VuYWJsZWQuanNvbicpXG4gICAgfVxufSJdfQ==