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

                if (currentDoc) {
                    console.log("✅ Doc found");
                    if (!currentDoc.channels) {
                        console.log("❌ No channels found");
                        await interaction.editReply("<:Function_Cross:997678332902645890> I could not find any channels in this server with joinping enabled");
                        return;
                    }
                    if (currentDoc.channels.length === 0) {
                        console.log("❌ No channels found on array");
                        await interaction.editReply("<:Function_Cross:997678332902645890> I could not find any channels in this server with joinping enabled");
                        return;
                    }
                } else {
                    console.log("✅ Doc not found");
                    await interaction.editReply("<:Function_Cross:997678332902645890> I could not find any joinping channels for this server");
                    return;
                }


                let description = "\n";

                for (const channel of currentDoc.channels) {
                    description = description + "<#" + channel + ">\n";
                }

                await interaction.editReply("<:Function_Tick:997678330277015553> **Here are the channels with joinping enabled in this server!** \n" + description);
                return;


            });

        } catch (e) {
            console.log(e);
        }
    }
}
