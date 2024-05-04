const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: { type: String, required: true },
  img: { data: Buffer, contentType: String },
  cordX: {type: Number, required: true},
  cordY: {type: Number, required: true}
});

module.exports = mongoose.model('Image', imageSchema);
