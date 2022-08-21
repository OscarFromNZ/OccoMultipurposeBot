

module.exports = {
    async execute(client, interaction) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");

            let user = interaction.options.getChannel('channel');
            if (!user) {
                user = interaction.user;
            }

            let schema = `\`\`\`markdown\n
            
            \`\`\``;

        } catch (e) {
            console.log(e);
        }
    }
}
