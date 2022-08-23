const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

module.exports = {
    async getOwnerCommandsArray() {
        console.log("⌛ Finding owner handler...");

        const ownerFiles = [];

        try {
            fs.readdirSync("./src/plugs/owner/execute", { withFileTypes: true })
                .filter(file => file.isFile()).forEach(file => {
                    console.log(file.name);
                    ownerFiles.push(file.name);
                });

        } catch (e) { console.log(e) }

        console.log("✅ Found owner handler ");

        console.log("\n");

        return (ownerFiles);
    },

    async isJoinPingEnabled(client, guild) {
        console.log("⌛ Checking if joinping is enabled or not for ... " + guild.name + " ++ connecting too");

        try {

            var dbo = client.db;

            console.log("⌛ Getting doc for " + guild.name);
            var currentDoc = await dbo.collection("guilds").findOne({
                _id: guild.id
            });

            if (currentDoc) {
                console.log("✅ Doc found");
                if (currentDoc.joinping.channels.length === 0) {
                    // Main
                    console.log("❌ There are no channels with joinping enabled");
                    return false
                } else {
                    // Main
                    console.log("✅ There are channels with joinping enabled");
                    return true;
                }
            } else {
                console.log("❌ Doc not found");
                return false;
            }

        } catch (e) { console.log(e) }



        console.log("\n");
    },

    async getCurrentDoc(client, guild) {
        console.log("⌛ Getting joinping channels for the guild");

        try {
            var dbo = client.db

            console.log("⌛ Getting doc for " + guild.name);
            var currentDoc = await dbo.collection("guilds").findOne({
                _id: guild.id
            });

            if (currentDoc.joinping) {
                for (const channelid of currentDoc.joinping.channels) {
                    console.log("⌛ Checking if " + channelid + " represents a valid channel");
                    if (!guild.channels.cache.has(channelid)) {
                        console.log("❌ It does not");
                        console.log("⌛ Removing from collection");
                        await dbo.collection("guilds").updateOne({ _id: guild.id },
                            {
                                joinping: {
                                    $pull:
                                    {
                                        channels: channelid
                                    }
                                }
                            }
                        );
                        console.log("✅ Removed");
    
                    } else {
                        console.log("✅ It does");
                    }
    
                }

            } else {
                console.log("❌ Doc not found");
                console.log("⌛ Making doc for " + guild.name);

                var base = {
                    id: guild.id, 
                    joinping: {
                        channels: []
                    }
                };

                await dbo.collection("guilds").insertOne(base, async function (err, res) {
                    if (err) {
                        await interaction.editReply("<:Function_Cross:997678332902645890> I failed to connect to my database, try again later :(");
                        throw err;
                    }
                    console.log("✅ Doc made");
                });

                console.log("✅ Channel added");
            }


            if (currentDoc) {
                console.log("✅ Doc found");
                return currentDoc;
                
            } else {
                console.log("❌ Doc not found");
                return 'error';
            }

        } catch (e) { console.log(e) }


        console.log("\n");
    }
}