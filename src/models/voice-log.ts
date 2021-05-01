import { model, Model, Schema, Document } from 'mongoose'

interface IUser {
    logEnabledAt: Date
    logDisabledAt: Date
    joinedAt: Date
    leavedAt: Date
    id: string
}

interface IVoiceLog {
    channelID: string
    users: Array<IUser>
}

interface VoiceLogDoc extends Document, IVoiceLog {}

interface VoiceLogModelInterface extends Model<any> {
    build(attr: IVoiceLog): VoiceLogDoc
}

const VoiceLog: Schema = new Schema({
    channelID: String,
    logEnabledAt: Date,
    logDisabledAt: Date,
    users: [{
        joinedAt: Date,
        leavedAt: Date,
        id: String
    }]
})

export default model<any, VoiceLogModelInterface>("voice_log", VoiceLog)
