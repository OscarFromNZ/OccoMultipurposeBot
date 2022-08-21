const akemi = require("../../akemi");

module.exports = {
    name: 'channelDelete',
    async execute(client, channel) {

        try {
            var dbo = client.db

            let currentDoc = await akemi.getCurrentDoc(client, channel.guild);

            if (!currentDoc.channels.includes(channel.id)) {
                return;
            }

            console.log("⌛ Removing channel from channel array");
            dbo.collection("guilds").updateOne({ _id: channel.guild.id },
                {
                    $pull:
                    {
                        channels: channel.id
                    }
                }
            )
            console.log("✅ Channel removed");
            return;

        } catch (e) {
            console.log(e);
        }
    },
};