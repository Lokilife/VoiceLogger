import { model, Model, Schema, Document } from 'mongoose'

interface ISession {
    note:       string,
    startedAt:  Date,
    endedAt:    Date,
}

interface SessionDoc extends Document, ISession {}

interface Session extends Model<any> {
    build(attr: ISession): SessionDoc
}

const session: Schema = new Schema({
    note:       String,
    startedAt:  Date,
    endedAt:    Date,
})

export default model<any, Session>("session", session)
