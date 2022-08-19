const akemi = require("../../akemi");

module.exports = {
    name: 'guildMemberAdd',
    async execute(client, guild) {
        console.log("Someone joined " + guild.name);

        try {
            if (akemi.isJoinPingEnabled(client, guild) == true) {
                const pingspoon = require("../plugs/joinping/joinpingSpoon");
                pingspoon.run(client, guild);
            }
        } catch (e) {
            console.log(e);
        }
    },
};