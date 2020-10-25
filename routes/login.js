const router = require('express')('router');

router.get('/',(req,res) => {
    console.log(req.body);
    let result;
    let errorMsg;
    if(req.cookies.token) result = true;
    if(req.cookies.errorMsg == 'invalidUsernameAndPass') errorMsg = 'Invalid Username or Password';
    res.cookie('success',false,{httpOnly:true})
    res.render('login',{ title: 'Log in', resStatus: result,err:errorMsg });
});

module.exports = router;