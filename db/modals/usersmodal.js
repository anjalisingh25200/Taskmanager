const mongoose = require('mongoose')
const validator = require('validator');
const { hash } = require('bcryptjs')
const UsersSchema = new mongoose.Schema({
    Username: {

        type: String,
        required: true,
        trim: true
    },
    Password: {

        type: String,
        required: true,
        minlength: 8,
        trim: true,

        validate(value) {
            if (value.toLowerCase().includes('Password')) {
                throw new Error('password cannot contain"Password"')
            }
        }

    },
    Email: {

        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("Email is invalid");
            }
        }
    }
})
UsersSchema.pre('save', async function () {
    if (this.isModified('Password')) {
        this.Password = await hash(this.Password, 12)
    }
})
//now we create a module
const Users = mongoose.model('Users', UsersSchema);
module.exports = { Users };
//module for mongo