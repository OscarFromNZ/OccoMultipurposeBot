module.exports = {
    async execute(client, message, command, args) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + command + " command");

            var members = await client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

            await message.reply("<:Function_Information:1008675275803983904> I am currently serving " + members + " members");

        } catch (e) {
            console.log(e);
        }
    }
}
