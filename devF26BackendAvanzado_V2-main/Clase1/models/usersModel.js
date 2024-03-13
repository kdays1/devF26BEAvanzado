const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add you password']
    },
    isAdmin: {
        type: Boolean,
        default: false // if we don't pass this value, it is going to be false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
//si le llamas user en mongoose será users