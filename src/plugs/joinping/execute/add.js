var MongoClient = require('mongodb').MongoClient;

const akemi = require('../../../../akemi');

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            let channel = interaction.options.getChannel('channel');
            if (!channel) {
                await interaction.editReply("<:Function_Cross:997678332902645890> Sorry but I couldn't find the channel you gave me :/");
                return;
            }

            var dbo = client.db

            let currentDoc = await akemi.getCurrentDoc(client, interaction.guild);

            if (!currentDoc) {
                console.log("❌ Doc not found");
                console.log("⌛ Making doc for " + interaction.guild.name);

                var base = {
                    id: interaction.guild.id, 
                    joinping: {
                        channels: [channel.id]
                    }
                };

                dbo.collection("guilds").insertOne(base, async function (err, res) {
                    if (err) {
                        await interaction.editReply("<:Function_Cross:997678332902645890> I failed to connect to my database, try again later :(");
                        throw err;
                    }
                    console.log("✅ Doc made");
                });

                console.log("✅ Channel added");
                await interaction.editReply(`<:Function_Tick:997678330277015553> Successfully added <#${channel.id}> to the joinping channels for this server`);
                return;
            }

            if (!currentDoc.joinping) {
                console.log("❌ No channels found");
                await interaction.editReply("<:Function_Cross:997678332902645890> I could not find any channels in this server with joinping enabled");
                return;
            }


            if (currentDoc.joinping.channels.includes(channel.id)) {
                console.log("Channel is already present in array");
                await interaction.editReply("<:Function_Cross:997678332902645890> This channel already has joinping enabled, if you wish to remove it, run </joinping remove:1008619540373831680>");
                return;
            }

            console.log("⌛ Adding channel to channel array");
            dbo.collection("guilds").updateOne({ _id: interaction.guild.id },
                {
                    joinping: {
                        $push:
                        {
                            channels: channel.id
                        }
                    }
                }
            )
            console.log("✅ Channel added");
            await interaction.editReply(`<:Function_Tick:997678330277015553> Successfully added <#${channel.id}> to the joinping channels for this server`);
            return;

        } catch (e) {
            console.log(e);
        }
    }
}
