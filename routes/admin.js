var express = require('express');
var router = express.Router();
var Movie = require('../model/movieModel')
module.exports = router;

//middleware to check authentication
router.use(function(req, res, next) {
    if(req.user){
        next();
        return;
    }
    res.redirect('/login');
});

router.get('/admin/movies/create', function (req, res) {
   res.render('create', {
      title: 'Create new translation' 
   });
   
});

router.post('/admin/movies/create', function (req, res) {
    var entry = new Movie({
        title: req.body.title,
        translation: req.body.translation,
    });

    entry.save(function (error) {
        if (error) { console.log('There is an error saving'); }
        console.log('The movie is saved');
        res.redirect('/dashboard');
    });
});

router.route('/admin/edit/:id')
    .all(function (req, res, next) {
        
        next();
    })
    .get(function (req, res) {
        var movieId = req.params.id;
        var query = Movie.findOne();
        query.where({ _id: movieId }).exec(function (error, result) {
            if (error) { console.log('There is no movie'); }
            res.render('editmovie', {
                title: 'Edit movie',
                movie: result
            });
        });
    })
    .post(function (req, res) {
        var movieId = req.params.id;
        Movie.update({_id : movieId}, {$set: { 
            title: req.body.title,
            translation: req.body.translation
        }}, function (error, result) {
            res.redirect('/dashboard');
        })
    });
    
router.get('/admin/delete/:id', function (req, res) {
    var movieId = req.params.id;
    var query = Movie.findOne({_id : movieId}, function (error, movie) {
        if (error) { console.log('There is no movie'); }
        movie.remove(function (error) {
            if (error) { console.log('Cant remove'); }
            console.log('Movie is removed!');
            res.redirect('/dashboard');
        });
    });
});