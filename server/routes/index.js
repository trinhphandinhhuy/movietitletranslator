var express = require('express');
var router = express.Router();
var movieController = require('../controllers/movieController');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send({ title: 'Express' });
  return movieController.list(req, res);
});

router.post('/', function(req, res, next) {
  return movieController.list(req, res);
});


router.get('/dashboard', function(req, res, next) {
  if(!req.isAuthenticated()){
        res.redirect('/login');
    } else {
      return movieController.renderDashboard(req, res);
    }
     
});


module.exports = router;
