const MongoClient = require('mongodb').MongoClient;

const akemi = require('../akemi');

module.exports = async (client) => {
    var mongoClient = await MongoClient.connect(client.mongo_uri);

    try {
        console.log("✅ Connected successfully");

        var dbo = mongoClient.db("mydb");

        return dbo;

    } catch (e) { console.log(e) }


}