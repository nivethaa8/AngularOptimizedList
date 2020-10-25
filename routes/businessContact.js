var express = require('express');
var router = express.Router();
const BusinessContact = require('../models/contact');
const auth = require('../middleware/auth');

//Get request to get the particular contact
router.get('/',auth, async (req, res, next) =>{
  try{
    let result = await BusinessContact.findById(req.query.id);
    let status;
    if(req.query.status) status=req.query.status;
    res.render('viewBusinessContact', {contact: result, title: 'view contact',status:status});
  }catch (e) {
    console.log(e);
  }
});

//put request to update the contact
router.put('/', async (req, res, next) =>{
  //first in the try block it will find the contact by matching id and then it will update with the request body
  try{
    let result = await BusinessContact.findById(req.body._id);
    result.name = req.body.name;
    result.email = req.body.email;
    result.contact_number = req.body.contact_number;
    let final = await result.save();
    // console.log(req.body);
    res.send('Contact updated successfully');
  }catch (e) {
    console.log(e.message);
    res.status(501).send(e.message);
  }
});

//delete request to delete the particular contact from the db
router.delete('/', async (req, res, next) =>{
  try{
    let result = await BusinessContact.deleteOne({_id:req.body.id});
    res.status(200).send('deleted successfully');
  }catch (e) {
    res.status(501).send('Something went wrong');
    //  res.redirect(`/viewContact?id=${req.body.id}&status=${e.message}`);
  }
});

module.exports = router;
