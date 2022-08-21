const {
    Client,
    Intents,
    MessageEmbed,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
});

const akemi = require('./akemi');

var MongoClient = require('mongodb').MongoClient;

const dotenv = require('dotenv');
dotenv.config()

const TOKEN = process.env.TOKEN
client.mongo_uri = process.env.MONGO_URI;


const startup = require('./src/startup');
startup(client);

client.prefix = '.';

client.staff = [
    '422603238936936450'
];


client.once('ready', async () => {
    console.log(`✅ ${client.user.tag} is now online!`);
    try {
        console.log("⌛ Connecting to MongoDB");

        const loadDB = require('./src/db');
        client.db = await loadDB(client);

    } catch (e) {
        console.log(e);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {

        try {
            await interaction.reply("<:Function_Pending:997678338426535936> Thinking...");

            const command = client.commandHandlers.get(interaction.commandName + "Handler.js");
            await command.handle(client, interaction)
        } catch (e) {
            console.log(e);
        }

    } else if (interaction.isAutocomplete()) {

        try {
            var dbo = client.db

            let currentDoc = await akemi.getCurrentDoc(client, interaction.guild);

            if (currentDoc) {
                console.log("✅ Doc found");
                const choices = [];
                for (let i = 0; i < currentDoc.channels.length; i++) {
                    let channel = await client.channels.cache.get(currentDoc.channels[i]);
                    if( typeof channel === 'undefined' ) {
                        choices.push("#deleted-channel");
                    } else {
                        choices.push(channel.name);
                    }
                }

                console.log("Choices are " + choices);

                const focusedValue = interaction.options.getFocused();
                const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );

            } else {
                console.log("❌ Doc not found");
                return;
            }

        } catch (e) {
            console.log(e)
        }

    }
});

client.on('messageCreate', async (message) => {
    console.log('msg');


    /*
    if (message.content === 'test') {
        try {
            if (await akemi.isJoinPingEnabled(client, message.guild) == true) {
                const pingspoon = require("../plugs/joinping/joinpingSpoon");
                await pingspoon.run(client, message.guild);
            }
        } catch (e) {
            console.log(e);
        }
    }
    */


    if (!client.staff.includes(message.author.id)) return;
    if (!message.content.startsWith(client.prefix)) return;

    console.log("⌛ Getting args for message`");
    const args = message.content.trim().split(/ +/g);
    const command = args[0].slice(client.prefix.length).toLowerCase();
    console.log("✅ Args found");

    console.log(client.ownerCmds + " are the owner-only cmds");
    if (!client.ownerCmds.includes(command + ".js")) return message.reply("<:Function_Cross:997678332902645890> Invalid command!");

    console.log("⌛ Getting and calling the commmand handler`");
    const ownerHandler = require('./src/plugs/owner/ownerHandler');
    ownerHandler.handle(client, message, command, args);
});


client.login(TOKEN);