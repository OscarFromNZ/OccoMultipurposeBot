const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test')

        .addSubcommand(subcommand =>
            subcommand
                .setName("joinping")
                .setDescription("🔧 Test the joinping!")
    ),

    settings: {
        isPremium: false
    }
}