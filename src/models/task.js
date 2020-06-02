const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    task: {
        type: String,
        required: true,
        minlength: 3
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = Task