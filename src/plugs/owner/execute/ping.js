module.exports = {
    async execute(client, message, command, args) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + command + " command");

            await message.reply(`<:Function_Information:1010354012790476870> Pong! Latency is ${Date.now() - message.createdTimestamp}ms & API Latency is ${Math.round(client.ws.ping)}ms`);

        } catch (e) {
            console.log(e);
        }
    }
}
