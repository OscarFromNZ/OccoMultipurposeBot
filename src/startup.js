const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('node:path');

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID

const akemi = require('../akemi');


module.exports = async (client) => {

    client.ownerCmds = await akemi.getOwnerCommandsArray();
    console.log(client.ownerCmds);

    // This is the data for each command so we can register the commands later on
    const commandData = [];

    // These are all the handlers for each command **group**
    client.commandHandlers = new Collection();

    console.log("⌛ Finding commands info...");

    // A list of all plugs, eg: **joinping**
    const plugs = fs.readdirSync("./src/plugs", { withFileTypes: true });

    // We are now going through each plug folder
    plugs.filter(file => file.isDirectory()).forEach(category => {
        console.log("⌛ Looking for folders under " + category.name);
        // Now we are getting each file under the plug
        fs.readdirSync(`./src/plugs/${category.name}`, { withFileTypes: true })
            .filter(file => file.isFile()).forEach(file => {
                console.log("⌛ Looking for files under " + category.name);
                // If the file found is a "data" file, we will push it to an array after getting it as so,
                if (file.name.includes('Data')) {
                    console.log("⌛ Attempted to get datafile " + file.name);

                    const datafile = require(`../src/plugs/${category.name}/${file.name}`);
                    commandData.push(datafile.data.toJSON());

                    console.log("✅ Found a data file " + file.name);

                    // If the file found is a "hander" file, we will set it to a collection after getting it as so,
                } else if (file.name.includes('Handler')) {
                    console.log("⌛ Attempted to get handlerfile " + file.name);

                    const handlerfile = require(`../src/plugs/${category.name}/${file.name}`);
                    client.commandHandlers.set(file.name, handlerfile);

                    console.log("✅ Found a handler file " + file.name);
                }
            });

        console.log("\n");
    });

    console.log("✅ Found info for all commands");


    console.log("⌛ Registering event protocolsss...");
    // Event handling
    const eventsPath = path.join(__dirname, '../src/events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    try {
        for (const file of eventFiles) {
            const event = require(`../src/events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }
        }

    } catch (e) {
        console.log(e);
    }

    console.log("✅ Events intitialized!");

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    (async () => {
        try {
            console.log("⌛ Beginning command deployment...");

            await rest.put(
                Routes.applicationCommands(CLIENT_ID),
                { body: commandData },
            );

            console.log("✅ Deployed commands");
        } catch (error) {
            console.error(error);
        }
    })();

}