var MongoClient = require('mongodb').MongoClient;

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

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


            });

        } catch (e) {
            console.log(e);
        }
    }
}
