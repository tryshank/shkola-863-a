const mongoose = require('mongoose');

exports.configure = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/shkola');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to DB');
  });
};
