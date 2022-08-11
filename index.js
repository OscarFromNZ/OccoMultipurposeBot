const {
    Client,
    Intents,
    MessageEmbed,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ]
});

const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config()
const TOKEN = process.env.TOKEN

const startup = require('./src/startup');
startup(client);

client.staff = [
    'test'
];

console.log(client.staff);

client.on('interactionCreate', async (interaction) => {

});

client.on('messageCreate', async (interaction) => {
    
});


client.login(TOKEN);