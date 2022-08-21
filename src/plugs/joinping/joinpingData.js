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
                        .setDescription('The channel to add to the joinping')
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
                        .setDescription('The channel to remove from the joinping')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('🏓 List all joinping channels in the server')
        ),

    settings: {
        isPremium: false
    }
}