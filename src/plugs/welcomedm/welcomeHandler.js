

module.exports = {
    async handle(client, interaction) {
        let subcmdName = await interaction.options.getSubcommand();

        console.log("\x1b[36m%s\x1b[0m", "Handling " + interaction.commandName + " " + subcmdName + " command");

        console.log("⌛ Getting correct file to execute`");
        const subcmdFile = require(`./execute/${subcmdName}`);
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