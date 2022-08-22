module.exports = async (client, interaction) => {

    try {
        await interaction.reply("<:Function_Pending:997678338426535936> Thinking...");

        const command = client.commandHandlers.get(interaction.commandName + "Handler.js");
        await command.handle(client, interaction)
    } catch (e) {
        console.log(e);
    }

}