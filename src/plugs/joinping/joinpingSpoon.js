

module.exports = {
    async run(client, member) {

        console.log("\n");
        console.log("⌛ Initiating joinping spoon");
        try {

            console.log("✅ Connected successfully");

            var dbo = client.db

            console.log("⌛ Getting doc for " + member.guild.name);
            var currentDoc = await dbo.collection("guilds").findOne({
                _id: member.guild.id
            });

            if (!currentDoc) {
                console.log("❌ Doc not found");
                return;
            }

            for (const channelid of currentDoc.channels) {
                var channel = await client.channels.cache.get(channelid);
                var msg = await channel.send(`<@${member.id}>`);
                await msg.delete();
            }

        } catch (e) {
            console.log(e);
        }

        console.log("✅ Joinping complete");

    }

}