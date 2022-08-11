const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');
const path = require('node:path');
const fs = require('fs');

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID


module.exports = (client) => {

    const commands = [];
    client.commands = new Collection();

    console.log("⌛ Finding commands...");
    const commandFiles = fs.readdirSync("./src/commands/commandHandlers").filter(file => file.endsWith('.js'));
    console.log("✅ Found commands");
    console.log("⌛ Registering commands...")

    for (const file of commandFiles) {
        if (file === 'ownerHandler.js') return;

        const command = require(`../src/commands/commandHandlers/${file}`);

        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
        console.log("✅ Registered " + file);
    }

    client.once('ready', async () => {
        console.log(`✅ ${client.user.tag} is now online!`);

        const rest = new REST({
            version: '9'
        }).setToken(TOKEN);
        (async () => {
            try {
                console.log("⌛ Deploying commmands");
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                },
                );
                console.log("✅ Deployed all commmands");
            } catch (error) {
                if (error) console.error(error);
            }
        })();

    });

}