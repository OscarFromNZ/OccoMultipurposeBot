const akemi = require('../../../../akemi');

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            var channelName = interaction.options.getString("channel");
            var channel = interaction.guild.channels.cache.find(channel => channel.name === channelName);
            console.log(channel);

            var dbo = client.db

            console.log("⌛ Getting doc for " + interaction.guild.name);
            let currentDoc = await akemi.getCurrentDoc(client, interaction.guild);
            console.log("✅ Doc found");

            if (!currentDoc.joinping.channels.includes(channel.id)) {
                await interaction.editReply("<:Function_Cross:997678332902645890> This channel does not have joinping enabled");
                return;
            }

            console.log("⌛ Removing channel from channel array");
            dbo.collection("guilds").updateOne({ _id: interaction.guild.id },
                {
                    joinping: {
                        
                        $pull:
                        {
                            channels: channel.id
                        }
                    }
                }
            )
            console.log("✅ Channel removed");
            await interaction.editReply("<:Function_Tick:997678330277015553> I have removed <#" + channel.id + "> from the joinping channels");
            return;

        } catch (e) {
            console.log(e);
        }
    }
}
