const mongoose = require('mongoose');

//creating mongoose document schema with the validation
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 25
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//creating the user model to store the data in the database

const User = new mongoose.model('User',userSchema);

module.exports = User;