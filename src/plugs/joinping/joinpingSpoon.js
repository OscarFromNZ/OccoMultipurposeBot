var MongoClient = require('mongodb').MongoClient;

module.exports = {
    async run(client, guild) {

        try {

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
    
                    if (!currentDoc) {
                        console.log("❌ Doc not found");
                        return;
                    }

                    for (const channel of currentDoc.channels) {
                        
                    }
    
                } catch (e) { console.log(e) }
    
    
            });

        } catch (e) {
            console.log(e);
        }

    }

}