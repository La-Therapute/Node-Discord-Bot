import {} from "dotenv/config";
import { Client, Intents, VoiceChannel } from 'discord.js';
import helpEmbed from "./Embed/Help";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { bruh, leave, ping } from "./Routes";
import Connection from "./Model/Connection";

const token = process.env.BOT_TOKEN;
const player = createAudioPlayer();
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});
let connection = new Connection;

function setConnection(connection) {
    connection = connection
}

function getConnection() {
    return connection;
}

let prefix = "/";

client.on("ready", () => {
    console.log("le bot discord -> " + client.user.tag + " est connecter");
});

client.on("messageCreate", message => {
    // if (message.author.author.bot !== true) {
        if (message.content.slice(0, prefix.length + 6) === prefix + "prefix") {
            message.reply("le prefix qui étais '" + prefix + "' est passer à {" + message.content.substring(prefix.length + 7) + "}");
            prefix = message.content.substring(prefix.length + 7)
        }

        if (message.content === prefix + "ping") {
            ping(message);
        }

        if (message.content === prefix + "leave") {    
            leave(message, connection);            
        }

        if (message.content === prefix + "bruh") {
            bruh(message, player, connection, setConnection);
        }

        // if (message.content === prefix + "join") {
        //     let channel = message.member.user.channel;

        //     if(channel !== undefined) {

        //         const player = createAudioPlayer();
        //         // const song = createAudioResource();
        //         const connection = joinVoiceChannel({
        //                 channelId: channel.channel.id,
        //                 guildId: channel.guild.id,
        //                 adapterCreator: channel.guild.voiceAdapterCreator,
        //             });
        //         try {
        //             player.play();
        //             connection.subscribe(player);
        //         } catch (err) {
        //             message.channel.send("erreur -> " + err)
        //         }
        //     } else {
        //         message.channel.send("channel invalide");
        //     }
            
        //     // try {
        //     //     connection(
        //     //         message.member.voice.channel,
        //     //         message.member.voice.channel.guild,
        //     //         message.member.voice.channel.guild.voiceAdapterCreator 
        //     //     )
        //     //     // var connection = joinVoiceChannel({
        //     //     //     channelId: message.member.voice.channel,
        //     //     //     guildId: message.member.voice.channel.guild,
        //     //     //     adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator 
        //     //     // });
        //     //     // connection;
        //     //     message.member.voice.joinVoiceChannel;
        //     // } catch {
        //     //     message.channel.send("error");
        //     // }
        //     // channelId: channel.id,
        //     // guildId: channel.guild.id,
        //     // adapterCreator: channel.guild.voiceAdapterCreator,

        //     // message.member.voice.channel.join().then(() => {console.log("yes")}).catch(error => {
        //     //     message.reply(error);
        //     // })
            
        // }

        // if (message.content === prefix + "help") {
        //     try {
        //         message.reply({ embeds : [helpEmbed]});
        //     } catch {
        //         message.reply("erreur");
        //     }
            
        // }

            // function isCommand(command){
            //     return !!message.content.toLowerCase().startsWith(prefix + command);
            // };
        
            // if(isCommand('join')){
            //     const channel = message.member.voice.channel;
            //     if(!channel) return message.channel.send('Connecte-toi à un chanel vocal :expressionless:');
        
            //     const player = createAudioPlayer();
            //     const resource = createAudioResource('https://cdn.discordapp.com/attachments/877988588233580598/877991781063610439/bruh.mp3');
        
            //     const connection = joinVoiceChannel({
            //         channelId: channel.id,
            //         guildId: message.guild.id,
            //         adapterCreator: message.guild.voiceAdapterCreator,
            //     });
        
            //     player.play(resource)
            //     connection.subscribe(player)
        
            //     // checking for ending, leaving vc if yes
        
            //     // player.on(AudioPlayerStatus.Idle, () => {
            //     //     connection.destroy() // leaves vc and destroys connection
            //     // })
            // }
    // }
});

client.login(token);