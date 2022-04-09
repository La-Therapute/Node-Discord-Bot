import {} from "dotenv/config";
import { Client, Intents } from 'discord.js';
import helpEmbed from "./Embed/Help";

const token = process.env.BOT_TOKEN;
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});
let prefix = "/";

client.on("ready", () => {
    console.log("le bot discord -> " + client.user.tag + " est connecter");
});

client.on("messageCreate", message => {
    // if (message.author.author.bot !== true) {
        if (message.content === prefix + "ping") {
            message.reply("pong");
        }

        if (message.content === prefix + "help") {
            try {
                message.reply({ embeds : [helpEmbed]})
            } catch {
                message.reply("erreur")
            }
            
        }
    // }
});

client.login(token);