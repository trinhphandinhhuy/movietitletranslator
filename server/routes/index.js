var express = require('express');
var router = express.Router();
var movieController = require('../controllers/movieController');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send({ title: 'Express' });
  return movieController.next(req, res);
  //return movieController.one(req, res);
});

router.get('/:index', function(req, res, next) {
  return movieController.next(req, res);
});


router.post('/', function(req, res, next) {
  return movieController.one(req, res);
});


router.get('/dashboard', function(req, res, next) {
  if(!req.isAuthenticated()){
        res.redirect('/login');
    } else {
      return movieController.renderDashboard(req, res);
    }
     
});


module.exports = router;
