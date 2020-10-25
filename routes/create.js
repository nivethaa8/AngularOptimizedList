const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Contact = require('../models/contact');
const bcrypt = require('bcrypt');

//post request for creating contact
router.post('/contact', async function(req, res, next) {

        let contact = new Contact({
            name:  req.body.name,
            email:  req.body.email,
            contact_number:req.body.contact_number
        });
        try{
            let result = await contact.save();
            if(result) res.status(200).send('Contact created successfully');;
        }catch (e) {
            res.status(501).send(e.message);
        }
});

//post request for creating user
router.post('/user',async function(req, res, next) {

    let salt = await bcrypt.genSalt(10);
    let hashed = await bcrypt.hash(req.body.password,salt);
    let user = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashed
    });
    try{
        let result = await user.save();
        if(result) res.status(200).send('User created successfully');;
    }catch (e) {
        res.status(501).send(e.message);
    }

});

module.exports = router;
