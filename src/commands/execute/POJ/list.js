var MongoClient = require('mongodb').MongoClient;

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

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

                console.log(currentDoc);
                let description = "\n";

                if (currentDoc) {
                    console.log("✅ Doc found");
                    for (const channel of currentDoc.channels) {
                        description = description + "<#" + channel + ">\n";
                    }
                }

                if (!currentDoc) {
                    console.log("✅ Doc not found");
                    await interaction.editReply("<:Function_Cross:997678332902645890> I could not find any joinping channels for this server");
                    return;
                }

                await interaction.editReply("<:Function_Tick:997678330277015553> **Here are the channels with joinping enabled in this server!** \n" + description);


            });

        } catch (e) {
            console.log(e);
        }
    }
}
