const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: { type: String }, //ID of the user
    guild: { type: String }, //ID of the guild
    registeredAt: { type: Number, default: Date.now() },

    addons: { type: Object, default: { // Extra features data
        achievements: {
            messageRewards:  [], // The specific messages the user has to send x amount of times to unlock an achievement eg: uwu 5 times (this will be saved as an object)
            messagesCount: null, // The amount of messages a user has to send
            roleRewards: [], // The IDs of roles the user can recieve to get rewards
        }
    }}
})

module.exports = mongoose.model('Member', schema);

/*
    messagesRewards: [
        uwu
    ]

    uwu: {
        messagesNeeded: 5,
    }

*/