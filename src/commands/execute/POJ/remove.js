var MongoClient = require('mongodb').MongoClient;

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            var channelName = interaction.options.getString("channel");
            var channel = interaction.guild.channels.cache.find(channel => channel.name === channelName);
            console.log(channel);

            console.log("⌛ Connecting to Mongo");

            MongoClient.connect(client.mongo_uri, async function (err, db) {
                if (err) {
                    await interaction.editReply("<:Function_Cross:997678332902645890> I failed to connect to my database, try again later");
                    throw err;
                }

                console.log("✅ Connected successfully");

                var dbo = db.db("mydb");

                console.log("⌛ Getting doc for " + interaction.guild.name);
                var currentDoc = await dbo.collection("guilds").findOne({
                    _id: interaction.guild.id
                });

                if (!currentDoc.channels.includes(channel.id)) {
                    await interaction.editReply("<:Function_Cross:997678332902645890> This channel does not have joinping enabled");
                    return;
                }

                currentDoc.channels.filter(achannel => achannel === channel.id);
                console.log(currentDoc.channels);

                await interaction.editReply("<:Function_Tick:997678330277015553> I have removed <#" + channel.id + "> from the joinping channels");
                return;

            });

        } catch (e) {
            console.log(e);
        }
    }
}
