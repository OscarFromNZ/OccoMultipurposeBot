module.exports = {
    async execute(client, message, command, args) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + command + " command");

        } catch (e) {
            console.log(e);
        }
    }
}
