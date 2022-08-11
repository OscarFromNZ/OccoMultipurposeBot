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
                        .setDescription('The song to remove from the queue')
                        .setRequired(true)
                    )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("🏓 Remove a channel from the joinping!")
                .addChannelOption((option) =>
                    option
                        .setName('channel')
                        .setDescription('The song to remove from the queue')
                        .setRequired(true)
                    )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('🏓 List all joinping channels in the server')
        ),


    async handle(client, interaction, cache) {
        let subcmd = await interaction.options.getSubcommand();
        console.log("\x1b[36m%s\x1b[0m", "Handling " + interaction.commandName + " " + subcmd + " command");
    }

}