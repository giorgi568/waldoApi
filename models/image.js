const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  cordX_waldo: { type: Number, required: true },
  cordY_waldo: { type: Number, required: true },
  cordX_wenda: { type: Number },
  cordY_wenda: { type: Number },
});

module.exports = mongoose.model('Image', imageSchema);
