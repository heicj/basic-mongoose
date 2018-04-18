const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    coach: String,
    stadium: {
        name: String,
        capacity: {
            type: Number,
            min: 0
        }
    },
    location: {
        state: String,
        city: String
    },
    players: [String]
});

module.exports = mongoose.model('Team', schema);