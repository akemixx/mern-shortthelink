const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0
    },
    ownerId : {
        type: String,
        required: true
    }
});

module.exports = model('Link', schema);