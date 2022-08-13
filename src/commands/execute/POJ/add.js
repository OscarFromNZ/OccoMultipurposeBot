
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

                dbo.collection("guilds").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("✅ Data saved!");
                  db.close();
                });

                dbo.collection("guilds").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
                    if (err) throw err;
                    
                    if (result.some(e => e.id === interaction.guild.id)) {
                        
                    }

                    db.close();
                });

            });

        } catch (e) {
            console.log(e);
        }
    }
}
