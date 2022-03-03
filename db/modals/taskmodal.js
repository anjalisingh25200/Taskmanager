const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    title: {

        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Description: {

        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {

        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _usersId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})
//now we create a module
const Task = mongoose.model('Task', TaskSchema);
module.exports = { Task };
//module for mongo