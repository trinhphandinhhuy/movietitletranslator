var express = require('express');
var router = express.Router();
var movieController = require('../controllers/movieController');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index1', { title: 'Express' });
  return movieController.list(req, res);
});

router.post('/', function(req, res, next) {
  return movieController.list(req, res);
});

router.get('/addmovie', function(req, res, next) {
  return movieController.addMovie(req, res);
});

router.post('/addmovie', function(req, res, next) {
  return movieController.create(req, res);
});


module.exports = router;
