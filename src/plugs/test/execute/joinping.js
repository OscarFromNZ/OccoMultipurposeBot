const akemi = require("../../../../akemi");

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            if (akemi.isJoinPingEnabled(client, interaction.guild)) {
                console.log("✅ Join ping is enabled");
                const pingspoon = require("../../joinping/joinpingSpoon");
                pingspoon.run(client, interaction.member);
                await interaction.editReply(`<:Function_Tick:997678330277015553> Join ping tested, if nothing happened, contact us on our support server!`);

            } else {
                console.log("❌ Join ping is disabled");
                await interaction.editReply("<:Function_Cross:997678332902645890> I could not find any channels with joinping enabled in this server");
                return;
            }

        } catch (e) {
            console.log(e);
        }
    }
}
