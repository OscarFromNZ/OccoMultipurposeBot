

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

        } catch (e) {
            console.log(e);
        }
    }
}
