var Movie = require('../model/movieModel');
var User = require('../model/userModel');
var nmovie = require('node-movie');

exports.list = function (req, res) {
    Movie.findOneRandom(function (error, movie) {
        nmovie(movie.title, function (error, data) {
            //console.log(movieInfo);
            res.render('index1', {
                title: 'Movie - Random',
                movie: movie,
                Plot: data.Plot,
                Poster: data.Poster,
            });
        });
    });
};

exports.renderDashboard = function (req, res) {
    Movie.find(function (error, movies) {
       if (error) { console.log('There is an error rendering movie list'); }
       res.render('dashboard', {
           title: 'Dashboard',
           movies : movies
       })
    });
};



exports.createUser = function (req, res) {
    var entry = new User({
        username: 'admin',
        password: 'lanvadiep',
    });

    entry.save(function (error) {
        if (error) { console.log('There is an error saving'); }
        console.log('The user is saved');
        res.redirect('/');
    });
};

