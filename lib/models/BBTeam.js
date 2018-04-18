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
        state: {
            type: String,
            required: true,
            enum: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC',  
                'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA',  
                'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE',  
                'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',  
                'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
        },
        city: String
    },
    players: [String]
});

module.exports = mongoose.model('Team', schema);