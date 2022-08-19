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

        MongoClient.connect(client.mongo_uri, async function (err, db) {
            if (err) {
                throw err;
            }

            try {
                console.log("✅ Connected successfully");

                var dbo = db.db("mydb");

                console.log("⌛ Getting doc for " + guild.name);
                var currentDoc = await dbo.collection("guilds").findOne({
                    _id: guild.id
                });

                if (currentDoc) {
                    console.log("✅ Doc found");
                    if (currentDoc.channels.length === 0) {
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


        });

        console.log("\n");
    }
}