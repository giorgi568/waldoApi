const Player = require('../models/player');
const { body, validationResult } = require('express-validator');

exports.player_get = async (req, res, next) => {
  try {
    const players = await Player.find({}).sort({ time: -1 }).exec();
    if (!players) {
      res.status(400).json({ success: false, message: 'player was not found' });
    } else {
      res.json({ players });
    }
  } catch (err) {
    return next(err);
  }
};

exports.player_add = [
  body('name', 'name must contain characters')
    .trim()
    .escape()
    .isLength({ min: 1, max: 20 }),
  body('time', 'must not be empty').trim().escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: errors });
      } else {
        const players = await Player.find({}).sort({ time: -1 }).exec();
        const player = new Player({
          name: req.body.name,
          time: req.body.time,
        });
        if (players.length < 5) {
          await player.save();
        } else {
          Player.findOneAndUpdate(players[-1], player);
        }
      }
    } catch (err) {
      next(err);
    }
  },
];
