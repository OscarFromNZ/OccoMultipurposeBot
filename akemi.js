const fs = require('fs');

module.exports = {
    async getOwnerCommandsArray() {
        console.log("⌛ Finding owner handler...");

        const ownerFiles = [];

        fs.readdirSync("./src/plugs/owner/execute", { withFileTypes: true })
        .filter(file => file.isFile()).forEach(file => {
            console.log(file.name);
            ownerFiles.push(file.name);
        });
    
        console.log("✅ Found owner handler ");
    
        console.log("\n");  

        return(ownerFiles);
    }
}