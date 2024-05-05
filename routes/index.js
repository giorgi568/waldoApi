var express = require('express');
var router = express.Router();
const playerController = require('../controllers/playerController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/players', playerController.players_get);
router.post('/player_add', playerController.player_add);


module.exports = router;
