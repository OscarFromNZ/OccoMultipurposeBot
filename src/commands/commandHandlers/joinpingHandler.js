const fs = require('fs');

const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joinping')
        .setDescription('Joinping')

        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("🏓 Add a channel to the joinping!")
                .addChannelOption((option) =>
                    option
                        .setName('channel')
                        .setDescription('The song to add to the joinping')
                        .setRequired(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("🏓 Remove a channel from the joinping!")
                .addStringOption((option) =>
                    option
                        .setName('channel')
                        .setDescription('The song to remove from the joinping')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('🏓 List all joinping channels in the server')
        ),


    async handle(client, interaction) {
        let subcmdName = await interaction.options.getSubcommand();

        console.log("\x1b[36m%s\x1b[0m", "Handling " + interaction.commandName + " " + subcmdName + " command");

        console.log("⌛ Getting correct file to execute`");
        const subcmdFile = require(`../execute/POJ/${subcmdName}`);
        console.log("✅ Found the file of " + subcmdFile);


        try {
            console.log("⌛ Executing " + subcmdName);
            await subcmdFile.execute(client, interaction);  
            console.log("✅ Executed " + subcmdName);
            return;

        } catch (e) {
            console.log(e);
        }

    }

}