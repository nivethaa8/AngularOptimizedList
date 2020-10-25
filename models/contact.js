const mongoose = require('mongoose');

//creating mongoose document schema with the validation
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: String,
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
    contact_number: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: 'enter valid phone number!'
        }
    }
});

//creating the user model to store the data in the database
const Contact = new mongoose.model('Contact',contactSchema);

module.exports = Contact;