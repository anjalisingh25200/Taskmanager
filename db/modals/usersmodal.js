const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    Username: {

        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Password: {

        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    Email: {

        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})
//now we create a module
const Users = mongoose.model('Users', UsersSchema);
module.exports = { Users };
//module for mongo