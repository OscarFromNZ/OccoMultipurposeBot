const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcomedm')
        .setDescription('Welcome DM')

        .addSubcommand(subcommand =>
            subcommand
                .setName("set")
                .setDescription("👋 Set the welcome DM message")
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName("view")
                .setDescription("👋 View the welcome DM message")
                .addStringOption((option) =>
                    option
                        .setName('type')
                        .setDescription('Type displayed')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Normal', value: 'normal' },
                            { name: 'Codeblock', value: 'codeblock' },
                        )
                )
        ),

    settings: {
        isPremium: false
    }
}