
const akemi = require('../../../../akemi');

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            let currentDoc = await akemi.getCurrentDoc(client, interaction.guild);
            console.log(currentDoc);

            if (!currentDoc.channels) {
                console.log("❌ No channels found");
                await interaction.editReply("<:Function_Cross:997678332902645890> I could not find any channels in this server with joinping enabled");
                return;
            }
            if (currentDoc.channels.length === 0) {
                console.log("❌ No channels found on array");
                await interaction.editReply("<:Function_Cross:997678332902645890> I could not find any channels in this server with joinping enabled");
                return;
            }

            let description = "\n";

            console.log(currentDoc.channels);
            for (const channel of currentDoc.channels) {
                description = description + "<#" + channel + ">\n";
            }

            await interaction.editReply("<:Function_Tick:997678330277015553> **Here are the channels with joinping enabled in this server!** \n" + description);
            return;

        } catch (e) {
            console.log(e);
        }
    }
}
