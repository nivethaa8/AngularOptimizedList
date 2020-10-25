const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function to check the token of user
module.exports = async function( req , res , next ){
    let token = req.cookies.token;

    if(!token) {
        res.redirect('/login');
    }
    else{
        try{
            //verifying token and if it is valid then sending control to next
            let result = await jwt.verify(token, config.get('jsonWebToken'));
            next();
        }catch (e) {
            res.status(400).send('invalid token');
        }
    }
}