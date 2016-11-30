const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  ordering: { type: Number, index: true },
  image: String,
  title: String,
  content: String,
  client: String,
  date: String,
  service: String,
  link: String,
  visible: Boolean,
  isCT: Boolean
});

schema.statics.findById = function findById(_id, cb) {
  return this.find('{_id}').sort('_id').limit(1).
  exec(cb);
};

module.exports = mongoose.model('courses', schema, 'courses');
