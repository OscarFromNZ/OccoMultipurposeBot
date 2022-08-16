const {
    Client,
    Intents,
    MessageEmbed,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ]
});

var MongoClient = require('mongodb').MongoClient;

const dotenv = require('dotenv');
dotenv.config()

const TOKEN = process.env.TOKEN
client.mongo_uri = process.env.MONGO_URI;

client.prefix = '.';

const startup = require('./src/startup');
startup(client);

client.staff = [
    '422603238936936450'
];


client.once('ready', async () => {
    console.log(`✅ ${client.user.tag} is now online!`);
    try {
        console.log("⌛ Connecting to MongoDB");
        MongoClient.connect(client.mongo_uri, async function(err, db) {
            if (err) throw err;
            console.log("✅ Connected to MongoDB");

            console.log("⌛ Adding DB to global variable");
            client.Database = db;
            console.log("✅ Added DB to global variable");
            
          });
        
    } catch (e) {
        console.log(e);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())  return;

    const command = client.cmdHandlers.get(interaction.commandName);

    try {
        await command.handle(client, interaction)
    } catch (e) {
        console.log(e);
    }
});

client.on('messageCreate', async (message) => {
    console.log('msg');
    if (!client.staff.includes(message.author.id)) return;
    if (!message.content.startsWith(client.prefix)) return;

    console.log("⌛ Getting args for message`");
    const args = message.content.trim().split(/ +/g);
    const command = args[0].slice(client.prefix.length).toLowerCase(); 
    console.log("✅ Args found");

    console.log("⌛ Getting and calling the commmad handler`");
    const ownerHandler = require('./src/commands/commandHandlers/ownerHandler');
    ownerHandler.handle(client, message, command, args);
});


client.login(TOKEN);