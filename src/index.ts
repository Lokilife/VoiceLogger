import { join } from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Client, Utils } from './lib'
import { Intents } from 'discord.js'

dotenv.config({path: join(__dirname, "..", ".env")})

const client: Client = new Client({
    partials: ["CHANNEL", "GUILD_MEMBER", "USER"],
    ws: {
        intents: Intents.ALL
    }
})

Utils.loadListeners(client, join(__dirname, "listeners"))
Utils.loadCommands(client, join(__dirname, "commands"))

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

client.login(process.env.TOKEN)

module.exports.client =  client
