
module.exports = {
    async execute(client, interaction, data) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");
            let channel = interaction.options.getChannel('channel');
            console.log("⌛ Pushing " + channel.id + " onto the POJ channel list");
            data.guild.addons.poj.channel.push(channel.id);
            console.log("✅ Channel pushed!");
    
            console.log("⌛ Saving new data");
            client.Database.saveGuild(data);
            console.log("✅ Data saved!");

        } catch (e) {
            console.log(e);
        }
    }
}
