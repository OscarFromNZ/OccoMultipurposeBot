var MongoClient = require('mongodb').MongoClient;

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            MongoClient.connect(client.mongo_uri, function(err, db) {
                if (err) throw err;

                var dbo = db.db("mydb");
                var myobj = { name: "Company Inc", address: "Highway 37" };
                dbo.collection("guilds").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });

            });

        } catch (e) {
            console.log(e);
        }
    }
}
