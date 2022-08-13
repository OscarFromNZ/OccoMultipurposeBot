const {
    Client,
    Intents,
    MessageEmbed,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ]
});

var MongoClient = require('mongodb').MongoClient;

const dotenv = require('dotenv');
dotenv.config()

const TOKEN = process.env.TOKEN
client.mongo_uri = process.env.MONGO_URI;

const startup = require('./src/startup');
startup(client);

client.staff = [
    '422603238936936450'
];


client.once('ready', async () => {
    console.log(`✅ ${client.user.tag} is now online!`);
    try {
        console.log("⌛ Connecting to MongoDB");
        MongoClient.connect(client.mongo_uri, function(err, db) {
            if (err) throw err;
            console.log("✅ Connected to MongoDB");

            console.log("⌛ Adding DB to global variable");
            client.Database = db;
            console.log("✅ Added DB to global variable");

            //console.log("⌛ Creating \"guilds\" collection");
            //var dbo = db.db("mydb");
            /*
            dbo.createCollection("guilds", function(err, res) {
              if (err) throw err;
              console.log("✅ Collection created");
              db.close();
            });
            */
            
          });
        
    } catch (e) {
        console.log(e);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())  return;

    const command = client.cmdHandlers.get(interaction.commandName);

    /*
    let data = {};
    try {
        console.log("⌛ Fetching user data for " + interaction.user.username);
        let userData = await client.Database.fetchUser(interaction.user.id);
        console.log("✅ Fetched user data successfully");
        console.log("⌛ Fetching guild data for " + interaction.guild.name);
        let guildData = await client.Database.fetchGuild(interaction.guild.id);
        console.log("✅ Fetched guild data successfully \n" + guildData);
    
        console.log("⌛ Storing data onto data object");

        data.user = userData;
        data.guild = guildData;
        console.log("✅ Data stored!");

    } catch (e) {
        console.log(e);
    }
    */

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