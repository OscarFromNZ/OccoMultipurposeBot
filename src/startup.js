const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID


module.exports = (client) => {

    console.log("⌛ Finding owner commands...");
    client.ownerCmds = [];
    const ownerFiles = fs.readdirSync("./src/commands/execute/Owner")
    .filter(file => file.endsWith('.js'))

    console.log("✅ Found owner commands");
    console.log("⌛ Grabbing owner commands...");

    for (const file of ownerFiles) {
        client.ownerCmds.push(file);
        console.log("✅ Grabbed " + file);
    }

    console.log("\n");

    const commands = [];
    client.cmdHandlers = new Collection();

    console.log("⌛ Finding commands...");
    const commandFiles = fs.readdirSync("./src/commands/commandHandlers")
    .filter(file => file.endsWith('.js'))
    .filter(file => file != ('ownerHandler.js'));

    console.log("✅ Found commands");
    console.log("⌛ Grabbing commands...");

    for (const file of commandFiles) {

        const command = require(`../src/commands/commandHandlers/${file}`);

        client.cmdHandlers.set(command.data.name, command);
        commands.push(command.data.toJSON());
        console.log("✅ Grabbed " + file);
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    (async () => {
        try {
            console.log("⌛ Beginning command deployment...");
    
            await rest.put(
                Routes.applicationCommands(CLIENT_ID),
                { body: commands },
            );
    
            console.log("✅ Deployed commands");
        } catch (error) {
            console.error(error);
        }
    })();

}