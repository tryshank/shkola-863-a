const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  adminEmail: String,
});

module.exports = mongoose.model('admin', schema, 'admin');
