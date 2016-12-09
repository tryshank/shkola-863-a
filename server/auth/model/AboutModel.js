const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  adminAboutLeft: String,
  adminAboutRight: String,
});

module.exports = mongoose.model('about', AboutSchema, 'about');
