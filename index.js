const {
    Client,
    Intents,
    MessageEmbed,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ]
});

const mongoose = require('mongoose');
const guildSchema = require('./src/Database/schemas/guild');

const dotenv = require('dotenv');
dotenv.config()

const TOKEN = process.env.TOKEN
const MONGO_URI = process.env.MONGO_URI

const startup = require('./src/startup');
startup(client);

client.staff = [
    '422603238936936450'
];

client.Database = require('./Database/Mongoose.js');

client.once('ready', async () => {
    console.log(`✅ ${client.user.tag} is now online!`);
    try {
        console.log("⌛ Connecting to MongoDB");
        await mongoose.connect(MONGO_URI, { keepAlive: true });
        console.log("✅ Connected to MongoDB");
    } catch (e) {
        console.log(e);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())  return;

    const command = client.cmdHandlers.get(interaction.commandName);

    let userData = await client.Database.fetchUser(interaction.user.id);
    if(!guildData) guildData = await client.Database.fetchGuild(interaction.guild.id);
    let data = {};
    data.user = userData;
    data.guild = guildData;

    try {
        await command.handle(client, interaction)
    } catch (e) {
        console.log(e);
    }
});

client.on('messageCreate', async (message) => {
    if (!message)
    if (!message.content.startsWith('-')) return;
});


client.login(TOKEN);