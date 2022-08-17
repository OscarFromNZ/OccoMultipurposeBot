const {
    Client,
    Intents,
    MessageEmbed,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

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
        MongoClient.connect(client.mongo_uri, async function (err, db) {
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
    if (interaction.isCommand()) {
        await interaction.reply("<:Function_Pending:997678338426535936> Thinking...")

        const command = client.cmdHandlers.get(interaction.commandName);

        try {
            await command.handle(client, interaction)
        } catch (e) {
            console.log(e);
        }

    } else if (interaction.isAutocomplete()) {

        MongoClient.connect(client.mongo_uri, async function (err, db) {
            if (err) {
                await interaction.editReply("<:Function_Cross:997678332902645890> I failed to connect to my database, try again later");
                throw err;
            }

            console.log("✅ Connected successfully");

            try {
                var dbo = db.db("mydb");

                console.log("⌛ Getting doc for " + interaction.guild.name);
                var currentDoc = await dbo.collection("guilds").findOne({
                    _id: interaction.guild.id
                });

                if (currentDoc) {
                    console.log("✅ Doc found");
                    const choices = [];
                    for (let i = 0; i < currentDoc.channels.length; i++) {
                        let channel = client.channels.cache.get(currentDoc.channels[i]);
                        choices.push(channel.name);
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


        });

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