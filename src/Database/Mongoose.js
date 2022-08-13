guildSchema = require("./schemas/guild"),
memberSchema = require("./schemas/member"),

//Create/find users Database
module.exports.fetchUser = async function(key){

    let userDB = await userSchema.findOne({ id: key });
    if (userDB){
        return userDB;
    } else{
        userDB = new userSchema({
            id: key,
            registeredAt: Date.now()
        })
        await userDB.save().catch(err => console.log(err));
        return userDB;
    }
};

//Create/find Guilds Database
module.exports.fetchGuild = async function(key){

    let guildDB = await guildSchema.findOne({ id: key });

    if (guildDB){
        return guildDB;
    } else{
        guildDB = new guildSchema({
            id: key,
            registeredAt: Date.now()
        })
        await guildDB.save().catch(err => console.log(err));
        return guildDB;
    }
};



//Create/find users Database
module.exports.saveUser = async function(data){

    try {
        await data.member.save();

    } catch (e) {
        console.log(e);
    }
};

//Create/find Guilds Database
module.exports.saveGuild = async function(data){
    try {
        await data.guild.save();

    } catch (e) {
        console.log(e);
    }
};