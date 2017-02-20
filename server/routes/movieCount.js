var express = require('express');
var router = express.Router();
var movieController = require('../controllers/movieController');

/* GET amount of movies */
router.get('/', function(req, res, next) {
  return movieController.count(req, res);
});

module.exports = router;
