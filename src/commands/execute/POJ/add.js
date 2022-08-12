const mongoose = require('mongoose');
const guildSchema = require('../../../schemas/guild');

module.exports = {
    async execute(client, interaction) {
        console.log("\x1b[36m%s\x1b[0m", "Executing " + interaction.commandName + " command");
    },
    
    async save() {
        try {
            setTimeout(async () => {
                await new guildSchema({
                    message: 'hello world',
                }).save();
            }, 1000);
    
        } catch (e) {
            console.log(e);
        }
    }
}
