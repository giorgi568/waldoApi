const Player = require('../models/player');
const { body, validationResult } = require('express-validator');

exports.players_get = async (req, res, next) => {
  try {
    const players = await Player.find({}).sort({ time: 1 }).exec();
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
      console.log('blbaalb');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: errors });
      } else {
        const players = await Player.find({}).sort({ time: 1 }).exec();
        const player = new Player({
          name: req.body.name,
          time: req.body.time,
        });
        if (players[4].time < req.body.time) {
          res.json({ success: false, message: 'no place in leaderboard' });
        }
        if (players.length < 5) {
          await player.save();
        } else {
          const lastPlayer = players[players.length - 1];
          await Player.findOneAndUpdate(
            { _id: lastPlayer._id },
            { name: req.body.name, time: req.body.time }
          );
        }
        res.json({ success: true, message: 'player added' });
      }
    } catch (err) {
      next(err);
    }
  },
];
