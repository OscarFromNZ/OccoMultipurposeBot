module.exports = {
    async execute(client, message, command, args) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + command + " command");

            var guilds = client.guilds.cache.size.toString();

            message.reply("<:Function_Information:1008675275803983904> I am currently in " + guilds + " servers")

        } catch (e) {
            console.log(e);
        }
    }
}
