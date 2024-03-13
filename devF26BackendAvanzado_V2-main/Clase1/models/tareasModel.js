const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
}, {
        timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)