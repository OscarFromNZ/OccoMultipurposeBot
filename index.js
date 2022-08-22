const {
    Client,
    Intents,
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

    switch (interaction.type) {
        case 2: { 
            // ApplicationCommand 
            await require('./src/interactions/applicationCommand')(client, interaction);
            break;
        } case 3: {
            // MessageComponent
            break;
        } case 4: {
            // Autocomplete
            await require('./src/interactions/autocomplete')(client, interaction);
            break;
        } case 5: {
            // ModalSubmit
            break;
        } default: {
            // Ping or unknown
            return;
        }
    }
    
});

client.on('messageCreate', async (message) => {
    console.log('msg');

    /*
    if (message.content === 'test') {
        let channel = await message.guild.channels.cache.get("1009967950888976465");
        console.log(channel.position);
        console.log(channel.rawPosition);
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