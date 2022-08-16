
const fs = require('fs');
const path = require('node:path');


module.exports = {

    async handle(client, message, command, args) {

        console.log("\x1b[36m%s\x1b[0m", "Handling " + command + " command");

        console.log("⌛ Getting correct file to execute`");

        if (!client.ownerCmds.includes(command + ".js")) return message.reply("<:Function_Cross:997678332902645890> Invalid command!");

        const cmdFile = require(`../execute/Owner/${command}`);

        console.log("✅ Found the file " + cmdFile);


        try {
            console.log("⌛ Executing " + command);
            await cmdFile.execute(client, message, command, args);  
            console.log("✅ Executed " + command);
            return;

        } catch (e) {
            console.log(e);
        }

    }

}