const fs = require('fs');

const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('achievements')
        .setDescription('Achievements')

        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("🔰 Add an achievement")
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("🔰 Remove an achievement")
                .addChannelOption((option) =>
                    option
                        .setName('achievement')
                        .setDescription('The achievement to remove')
                        .setRequired(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('🔰 List all your achievements')
        ),


    async handle(client, interaction, data) {
        let subcmdName = await interaction.options.getSubcommand();

        console.log("\x1b[36m%s\x1b[0m", "Handling " + interaction.commandName + " " + subcmdName + " command");

        console.log("⌛ Getting correct file to execute`");
        const subcmdFile = require(`../execute/Achievements/${subcmdName}`);
        console.log("✅ Found the file of " + subcmdFile);


        try {
            console.log("⌛ Executing " + subcmdName);
            await subcmdFile.execute(client, interaction, data);  
            console.log("✅ Executed " + subcmdName);
            return;

        } catch (e) {
            console.log(e);
        }

    }

}