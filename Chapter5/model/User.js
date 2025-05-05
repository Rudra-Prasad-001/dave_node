const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number,

        Editor: Number
    },

    refreshToken: String
})


const User = mongoose.model('User', userSchema);

module.exports = {User};