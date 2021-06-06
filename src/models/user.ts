import { model, Model, Schema, Document } from 'mongoose'

interface IJoin {
    logEnabledAt: Date,
    logDisabledAt: Date,
    joinedAt: Date,
    leavedAt: Date,
    channelID: string
}

interface IUser {
    userID: string,
    note: string,
    joins: IJoin[]
}

interface UserDoc extends Document, IUser {}

interface User extends Model<any> {
    build(attr: IUser): UserDoc
}

const User: Schema = new Schema({
    userID:     String, // ID пользователя
    note:       String,
    logMode:    String,
    joins:  [{
        channelID:      String,
        logEnabledAt:   Date,
        logDisabledAt:  Date,
        joinedAt:       Date,
        leavedAt:       Date,
    }]
})

export default model<any, User>("user", User)
