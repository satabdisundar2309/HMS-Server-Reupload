const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})

const messageModel = mongoose.model('Message', messageSchema)
module.exports = messageModel;