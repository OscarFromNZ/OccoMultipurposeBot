module.exports = {
    async execute(client, message, command, args) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + command + " command");

            var guilds = await client.guilds.cache.size.toString();

            await message.reply("<:Function_Information:1010354012790476870> I am currently in " + guilds + " servers")

        } catch (e) {
            console.log(e);
        }
    }
}
