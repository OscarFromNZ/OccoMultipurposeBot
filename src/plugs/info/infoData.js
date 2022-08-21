const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('info')

        .addSubcommand(subcommand =>
            subcommand
                .setName("user")
                .setDescription("📈 Get information of a user!")
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('The user to get information')
                        .setRequired(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName("server")
                .setDescription("📈 Get information of this server!")
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('bot')
                .setDescription('📈 Get information of me! :D')
        ),

    settings: {
        isPremium: false
    }
}