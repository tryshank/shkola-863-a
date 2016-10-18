const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  image: String,
  title: String,
  content: String,
  client: String,
  date: String,
  service: String,
  link: String,
  visible: Boolean,
});

schema.statics.findById = function (_id, cb) {
  return this.find('{_id}').sort('_id').limit(1).
  exec(cb);
};

module.exports = mongoose.model('courses', schema, 'courses');
