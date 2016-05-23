var Movie = require('../model/movieModel');
var User = require('../model/userModel');
var nmovie = require('node-movie');
var MovieDB = require('moviedb')('2ffb4d76855be971ac9d322ae367d589');

exports.list = function (req, res) {
    Movie.findOneRandom(function (error, movie) {
        nmovie(movie.title, function (error, data) {
            MovieDB.movieInfo({ id: data.imdbID }, function (err, result) {;
                var poster;
                if (!result){
                    poster = 'http://cinematic.ge/uploads/posts/2014-04/1398024527_no-poster.jpg';
                } else {
                  poster = 'https://image.tmdb.org/t/p/original' + result.poster_path;  
                }
                
                res.render('index1', {
                    title: 'Movie - Random',
                    movie: movie,
                    Plot: data.Plot,
                    Poster: poster,
                });
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

