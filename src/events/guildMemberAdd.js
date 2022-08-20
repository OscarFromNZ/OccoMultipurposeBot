const akemi = require("../../akemi");

module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        console.log(member);
        console.log("Someone joined " + member.guild.name);

        try {
            if (akemi.isJoinPingEnabled(client, member.guild)) {
                const pingspoon = require("../plugs/joinping/joinpingSpoon");
                pingspoon.run(client, member);
            }
        } catch (e) {
            console.log(e);
        }
    },
};