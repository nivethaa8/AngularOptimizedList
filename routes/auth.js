const User = require('../models/user');
const router = require('express')('Router');
const bcrypt = require('bcrypt');//package to encrypt the password
const jwt = require('jsonwebtoken');//package to generate json web token
const config = require('config');

//post request rout to handle log in request
router.post('/',async (req,res) => {
    res.cookie('errorMsg','',{ httpOnly:true });//initializing error cookie to be empty
    //try block to execute asynchronous method
    //if any error occur it will be catch in catch block
    try{
        //finding the user if not found then sending the 400 response status
        let user = await User.findOne({name: req.body.name});
        if(!user) res.status(400).send('User not found');

        //if user found then matching the password with bcrypt compare method
        let result = await bcrypt.compare( req.body.password, user.password);
        //if password matches then it will return the json web token and store it in the cookie and redirect back to login page
        if(result) {
            let token = await jwt.sign({_id:user.id},config.get('jsonWebToken'));
            res.cookie('token',token,{ httpOnly:true });
            res.redirect('/login');
        }
        //if password does not match then it will send the cookie containing error message in response
        else {
            res.cookie('errorMsg','invalidUsernameAndPass',{ httpOnly:true });
            res.redirect('/login');
        }
    }catch (e) {
        console.log(e.message);
        res.status(501).send(e.message);
    }
});

//post request rout to handle log out request
router.post('/logOut',async (req,res) => {
    //first check for the existence of cookie token
    //if token found in the cookie then it will remove it else it if not found then it will send the response of 400(Bad request)
    if(req.cookies.token){
        res.clearCookie('token');
        res.redirect('/login');
    }else{
        res.status(400).send('Invalid request');
    }
});

module.exports = router;