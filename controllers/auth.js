var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../model/userModel');
var movieController = require('../controllers/movieController');

module.exports = router;

router.get('/login', function (req, res) {
    //bypass login in development
    /*
   if(req.app.get('env') === 'development'){   
       var user = users[0]; //grap the first user in the list
       if(req.query.user){
           user = _.find(users, u => u.name === req.query.user); // specifize user in development mode
       }
       req.logIn(user, function (err) {
           if(err) {return next(err);}
           return res.redirect('/');
       });
       return;
   }*/
   res.render('login'); 
});

router.post('/login', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }));
    
router.get('/logout', function (req, res) {
   req.logout();
   res.redirect('/login');
});

router.get('/createuser', function (req,res) {
    return movieController.createUser(req,res);
})