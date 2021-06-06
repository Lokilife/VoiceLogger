import { ClientEvents, GuildMember, Snowflake, VoiceChannel } from "discord.js"
import { Listener } from "../lib"
import { UserJoin, UserLeave } from "../lib/utils"

export default class ReadyListener2 extends Listener {
    public type: keyof ClientEvents = "ready"
    public id: string = "Logger"

    async exec() {
        const guild = this.client.guilds.resolve(process.env.GUILD_ID)
        var voices: VoiceChannel[] = process.env.VOICES
            .split(",")
            .map(e => guild.channels.resolve(e.trim()))
            .filter(voice => voice && voice.type == "voice") as VoiceChannel[]
        
        if (!voices.length)
            voices = guild.channels.cache.array().filter(channel => channel.type == "voice") as VoiceChannel[]
        
        var prevChannelsMembers: Map<Snowflake, GuildMember[]> = new Map()

        setInterval(
            async () => {
                if (!this.client.logEnabled) return
                for (const voice of voices) {
                    const prevMembers = prevChannelsMembers.get(voice.id)
                    if (prevMembers && !voice.members.array().length)
                        for (const member of prevMembers)
                            await UserLeave(member, voice, this.client.enabledMode)

                    prevChannelsMembers.set(voice.id, voice.members.array())

                    for (const [,member] of voice.members) {
                        const join = await UserJoin(member, voice, this.client.logEnabledAt, this.client.enabledMode)
                        if (join && join.channelID != voice.id) return await UserLeave(member, voice, this.client.enabledMode)
                        if (join && join.channelID == voice.id) return
                    }
                }
            },
            parseInt(process.env.VOICE_CHECK_INTERVAL)
        )
    }
}