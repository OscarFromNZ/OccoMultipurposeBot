const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: { type: String }, //ID of the guild
    registeredAt: { type: Number, default: Date.now() },

    addons: { type: Object, default: { // Extra features data
        poj: {
            channel:  null, // ID for the channel to send messages to
            message: null, // Custom message
            image: false, // Check if image is enabled
            embed: false // Check if embed is enabled
        },
        achievements: {
            list: [], // List of all possible achievements
            channel:  null, // ID for channel to send messages to
            message: null, // Custom message
            image: false, // Check if image is enabled
            embed: false // Check if embed is enabled
        }
    }}
})

module.exports = mongoose.model('Guild', schema);