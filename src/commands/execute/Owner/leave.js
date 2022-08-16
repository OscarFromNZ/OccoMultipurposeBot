module.exports = {
    async execute(client, message, command, args) {
        try {
            console.log("\x1b[36m%s\x1b[0m", "Executing " + command + " command");

            let id = args[1];
            if (!id) return await message.reply("<:Function_Cross:997678332902645890> No ID specified");
            let guild = await client.guilds.cache.get(id);
            if (!guild) return await message.reply("<:Function_Cross:997678332902645890> Could not find the guild");

            await guild.leave();
            await message.reply("<:Function_Tick:997678330277015553> Sucessfully left " + guild.name);

        } catch (e) {
            console.log(e);
        }   
    }
}
