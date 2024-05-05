var express = require('express');
var router = express.Router();
const playerController = require('../controllers/playerController');
const imageController = require('../controllers/imageController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/players', playerController.players_get);
router.post('/player_add', playerController.player_add);

router.get('/images', imageController.images_get);
router.get('/image/:id', imageController.image_get);
router.get('/found_waldo/:id', imageController.found_waldo);
router.get('/found_wenda/:id', imageController.found_wenda);

module.exports = router;
