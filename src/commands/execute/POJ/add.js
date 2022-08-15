var MongoClient = require('mongodb').MongoClient;

module.exports = {
    async execute(client, interaction, data) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            let channel = interaction.options.getChannel('channel');
            if (!channel) {
                await interaction.reply("<:Function_Cross:997678332902645890> Sorry but I couldn't find the channel you gave me :/");
                return;
            }

            console.log("⌛ Connecting to Mongo");

            MongoClient.connect(client.mongo_uri, async function (err, db) {
                if (err) {
                    await interaction.reply("<:Function_Cross:997678332902645890> I failed to connect to my database, try again later");
                    throw err;
                }

                console.log("✅ Connected successfully");

                var dbo = db.db("mydb");

                console.log("⌛ Getting doc for " + interaction.guild.name);
                var currentDoc = await dbo.collection("guilds").findOne({
                    _id: interaction.guild.id
                });

                console.log(currentDoc);
                

                if (currentDoc) {
                    console.log("✅ Doc found");
                    if (currentDoc.channels.includes(channel.id)) {
                        console.log("Channel is already present in array");
                        await interaction.reply("<:Function_Cross:997678332902645890> This channel already has joinping enabled, if you wish to remove it, run </joinping remove:1008619540373831680>");
                        return;
                    }
                }

                if (!currentDoc) {
                    console.log("✅ Doc not found");
                    console.log("⌛ Making doc for " + interaction.guild.name);
                    var base = { _id: interaction.guild.id, channels: [channel.id] };

                    dbo.collection("guilds").insertOne(base, async function (err, res) {
                        if (err) {
                            await interaction.reply("<:Function_Cross:997678332902645890> I failed to connect to my database, try again later :(");
                            throw err;
                        }
                        console.log("✅ Doc made");
                        db.close();
                    });

                    console.log("✅ Channel added");
                    await interaction.reply(`<:Function_Tick:997678330277015553> Successfully added <#${channel.id}> to the joinping channels for this server`);
                    return;
                }

                console.log("⌛ Adding channel to channel array");
                dbo.collection("guilds").updateOne({ _id: interaction.guild.id },
                    {
                        $push:
                        {
                            channels: channel.id
                        }
                    }
                )
                console.log("✅ Channel added");
                await interaction.reply(`<:Function_Tick:997678330277015553> Successfully added <#${channel.id}> to the joinping channels for this server`);
                return;

            });

        } catch (e) {
            console.log(e);
        }
    }
}
