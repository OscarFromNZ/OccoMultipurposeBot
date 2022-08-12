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

const dotenv = require('dotenv');
dotenv.config()
const TOKEN = process.env.TOKEN

const startup = require('./src/startup');
startup(client);

client.staff = [
    '422603238936936450'
];

client.once('ready', async () => {
    console.log(`✅ ${client.user.tag} is now online!`);
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
    if (!message)
    if (!message.content.startsWith('-')) return;
});


client.login(TOKEN);