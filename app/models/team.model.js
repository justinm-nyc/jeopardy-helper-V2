const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    name: String,
    clickedTime: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);