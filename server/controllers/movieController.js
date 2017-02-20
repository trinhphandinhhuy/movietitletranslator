var Movie = require('../model/movieModel');
var User = require('../model/userModel');
var nmovie = require('node-movie');
var MovieDB = require('moviedb')('2ffb4d76855be971ac9d322ae367d589');


exports.one = function (req, res) {
    console.log();
    Movie.findOne().skip().sort({created_at : -1}).exec(function (error, movie) {
        if(error) return console.log(error);
       nmovie(movie.title, function (error, data) {

            if(error) return console.log('The error 1 is: ' +error);
            MovieDB.movieInfo({ id: data.imdbID }, function (err, result) {
                if(err) console.log('The error 2 is: ' +error);
                var poster;
                if (!result){
                    //poster = 'http://cinematic.ge/uploads/posts/2014-04/1398024527_no-poster.jpg';
                    poster = '/public/images/' + movie.title + '.jpg';
                } else {
                  poster = 'https://image.tmdb.org/t/p/original' + result.poster_path;  
                }
                //console.log(poster);
                return res.send( {
                    movie: movie,
                    Plot: data.Plot,
                    Poster: poster,
                });

            });
        });
    });
};

exports.count = function (req, res) {
    Movie.count({}, function (err, count) {
        console.log('There are ' + count + ' movies in the database.');
        return res.send({
            count : count
        })
    })
}

exports.next = function (req, res) {
    console.log('You are requesting the movie index of ' + req.params.index);
    Movie.findOne().skip(Number(req.params.index)).sort({created_at : -1}).exec(function (error, movie) {
        if(error) return console.log(error);
       nmovie(movie.title, function (error, data) {

            if(error) return console.log('The error 1 is: ' +error);
            MovieDB.movieInfo({ id: data.imdbID }, function (err, result) {
                if(err) console.log('The error 2 is: ' +error);
                var poster;
                if (!result){
                    //poster = 'http://cinematic.ge/uploads/posts/2014-04/1398024527_no-poster.jpg';
                    poster = '/public/images/' + movie.title + '.jpg';
                } else {
                  poster = 'https://image.tmdb.org/t/p/original' + result.poster_path;  
                }

                return res.send( {
                    movie: movie,
                    Plot: data.Plot,
                    Poster: poster,
                });

            });
        });
    });
};

