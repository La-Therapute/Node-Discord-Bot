import { AudioPlayerStatus, createAudioResource, joinVoiceChannel } from "@discordjs/voice";

export default function bruh(message, player, connection, setConnection) {

    const channel = message.member.voice.channel;

    if (!channel) return message.channel.send('Connecte-toi à un chanel vocal :expressionless:');

    const resource = createAudioResource('https://cdn.discordapp.com/attachments/877988588233580598/877991781063610439/bruh.mp3');

    setConnection(joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
    }));

    player.play(resource)
    joinVoiceChannel(connection).subscribe(player)

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy()
    })
}

