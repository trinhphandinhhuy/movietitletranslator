var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/userModel');

passport.use(new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    /*var user = _.find(users, u => u.name === username);
    
    if(!user || user.password !== password){
        done(null, false);
        return;
    }*/
    User.findOne({ username: username }, function (error, user) {
        if (error) { return done(error); }
        if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false,
                req.flash('message', 'User Not found.'));
        }
        if (password != user.password) {
            console.log('Invalid Password');
            return done(null, false,
                req.flash('message', 'Invalid Password'));
        }
        done(null, user);
    });


}));

passport.serializeUser(function (user, done) {
    done(null, user); 
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});