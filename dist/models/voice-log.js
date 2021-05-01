"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VoiceLog = new mongoose_1.Schema({
    channelID: String,
    logEnabledAt: Date,
    logDisabledAt: Date,
    users: [{
            joinedAt: Date,
            leavedAt: Date,
            id: String
        }]
});
exports.default = mongoose_1.model("voice_log", VoiceLog);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9pY2UtbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy92b2ljZS1sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUQ7QUFxQnpELE1BQU0sUUFBUSxHQUFXLElBQUksaUJBQU0sQ0FBQztJQUNoQyxTQUFTLEVBQUUsTUFBTTtJQUNqQixZQUFZLEVBQUUsSUFBSTtJQUNsQixhQUFhLEVBQUUsSUFBSTtJQUNuQixLQUFLLEVBQUUsQ0FBQztZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxFQUFFLEVBQUUsTUFBTTtTQUNiLENBQUM7Q0FDTCxDQUFDLENBQUE7QUFFRixrQkFBZSxnQkFBSyxDQUE4QixXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtb2RlbCwgTW9kZWwsIFNjaGVtYSwgRG9jdW1lbnQgfSBmcm9tICdtb25nb29zZSdcblxuaW50ZXJmYWNlIElVc2VyIHtcbiAgICBsb2dFbmFibGVkQXQ6IERhdGVcbiAgICBsb2dEaXNhYmxlZEF0OiBEYXRlXG4gICAgam9pbmVkQXQ6IERhdGVcbiAgICBsZWF2ZWRBdDogRGF0ZVxuICAgIGlkOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIElWb2ljZUxvZyB7XG4gICAgY2hhbm5lbElEOiBzdHJpbmdcbiAgICB1c2VyczogQXJyYXk8SVVzZXI+XG59XG5cbmludGVyZmFjZSBWb2ljZUxvZ0RvYyBleHRlbmRzIERvY3VtZW50LCBJVm9pY2VMb2cge31cblxuaW50ZXJmYWNlIFZvaWNlTG9nTW9kZWxJbnRlcmZhY2UgZXh0ZW5kcyBNb2RlbDxhbnk+IHtcbiAgICBidWlsZChhdHRyOiBJVm9pY2VMb2cpOiBWb2ljZUxvZ0RvY1xufVxuXG5jb25zdCBWb2ljZUxvZzogU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gICAgY2hhbm5lbElEOiBTdHJpbmcsXG4gICAgbG9nRW5hYmxlZEF0OiBEYXRlLFxuICAgIGxvZ0Rpc2FibGVkQXQ6IERhdGUsXG4gICAgdXNlcnM6IFt7XG4gICAgICAgIGpvaW5lZEF0OiBEYXRlLFxuICAgICAgICBsZWF2ZWRBdDogRGF0ZSxcbiAgICAgICAgaWQ6IFN0cmluZ1xuICAgIH1dXG59KVxuXG5leHBvcnQgZGVmYXVsdCBtb2RlbDxhbnksIFZvaWNlTG9nTW9kZWxJbnRlcmZhY2U+KFwidm9pY2VfbG9nXCIsIFZvaWNlTG9nKVxuIl19