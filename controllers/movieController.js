var Movie = require('../model/movieModel');
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

exports.addMovie = function (req, res) {
    res.render('create', { title: 'Movie - Add' });
};


exports.create = function (req, res) {
    var entry = new Movie({
        title: req.body.title,
        translation: req.body.translation,
    });

    entry.save(function (error) {
        if (error) { console.log('There is an error saving'); }
        console.log('The movie is saved');
        res.redirect('/');
    });
};
