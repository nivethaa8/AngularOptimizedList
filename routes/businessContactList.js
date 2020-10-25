const router = require('express')('router');
const Contact = require('../models/contact');
const auth = require('../middleware/auth');

//get request to get the list of all contacts and sort them by their name
router.get('/',auth,async(req,res) => {
    try{
        let contactList = await Contact.find({}).sort('name');
        res.render('businessContactList',{ contacts:contactList });
    }catch (e) {
        res.status(501).send('internal Server error');
    }
});
module.exports = router;