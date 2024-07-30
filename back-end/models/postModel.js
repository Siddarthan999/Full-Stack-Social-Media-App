const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true
        }
    },
    {
        collection: 'SocialMediaPostDataCollection'
    }
);

module.exports = mongoose.model('SocialMediaPostDataCollection', userSchema);
