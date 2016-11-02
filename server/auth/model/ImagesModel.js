const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  small: String,
  big: String,
});

module.exports = mongoose.model('images', schema, 'images');
