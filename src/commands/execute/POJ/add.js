
module.exports = {
    async execute(client, interaction, data) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");
            
            let channel = interaction.options.getChannel('channel');

            var myobj = { name: "Company Inc", address: "Highway 37" };
    
            console.log("⌛ Saving new data");

            MongoClient.connect(client.mongo_uri, function(err, db) {
                if (err) throw err;

                var dbo = db.db("mydb");
                var myobj = { name: "test", address: "testy" };
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
