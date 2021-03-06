const mongoose = require('mongoose');

exports.configure = () => {
  mongoose.Promise = global.Promise;
  if (process.env.ENV_MONGO_DEBUG === 'true') {
    mongoose.set('debug', true);
  }
  console.log(`MongoDB host ${process.env.ENV_MONGODB_URI}`);
  mongoose.connect(process.env.ENV_MONGODB_URI);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected to DB');
  });
};
