const Image = require('../models/image');
const { body, validationResult } = require('express-validator');

exports.images_get = async (req, res, next) => {
  try {
    const images = await Image.find({}).exec();
    if (!images) {
      res.status(400).json({ success: false, message: 'images was not found' });
    } else {
      res.json({
        images,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.image_get = async (req, res, next) => {
  try {
    const image = await Image.findById(req.body.id).exec();
    if (!image) {
      res.status(400).json({ success: false, message: 'image was not found' });
    } else {
      res.json({
        image,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.found_waldo = async (req, res, next) => {
  try {
    const image = await Image.findById(req.body.id).select('-data').exec();
    const x = req.body.x;
    const y = req.body.y;
    if (!image) {
      res.status(400).json({ success: false, message: 'image was not found' });
    }

    // finding logic
    if (
      x < image.cordX_waldo + 40 &&
      x > image.cordX_waldo - 40 &&
      y < image.cordY_waldo + 40 &&
      y > image.cordY_waldo - 40
    ) {
      res.json({
        found: true,
      });
    } else {
      res.json({
        found: false,
      });
    }
  } catch (err) {
    next(err);
  }
};


exports.found_wenda = async (req, res, next) => {
  try {
    const image = await Image.findById(req.body.id).select('-data').exec();
    const x = req.body.x;
    const y = req.body.y;
    if (!image) {
      res.status(400).json({ success: false, message: 'image was not found' });
    }

    // finding logic
    if (
      x < image.cordX_wenda + 40 &&
      x > image.cordX_wenda - 40 &&
      y < image.cordY_wenda + 40 &&
      y > image.cordY_wenda - 40
    ) {
      res.json({
        found: true,
      });
    } else {
      res.json({
        found: false,
      });
    }
  } catch (err) {
    next(err);
  }
};
