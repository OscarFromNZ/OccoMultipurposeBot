module.exports = async (client, interaction) => {

    try {
        let currentDoc = await akemi.getCurrentDoc(client, interaction.guild);

        if (currentDoc) {
            console.log("✅ Doc found");
            const choices = [];

            for (let i = 0; i < currentDoc.channels.length; i++) {
                let channel = await client.channels.cache.get(currentDoc.channels[i]);
                if (typeof channel === 'undefined') {
                    choices.push("#deleted-channel");
                } else {
                    choices.push(channel.name);
                }
            }

            console.log("Choices are " + choices);

            const focusedValue = interaction.options.getFocused();
            const filtered = choices.filter(choice => choice.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );

        } else {
            console.log("❌ Doc not found");
            return;
        }
    } catch (e) {
        console.log(e);
    }

}