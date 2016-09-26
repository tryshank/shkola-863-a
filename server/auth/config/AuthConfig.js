const passport = require('passport');
const Strategy = require('passport-local');
const UserModel = require('../../auth/model/UserModel');
const expressSession = require('express-session');
const redisStoreFactory = require('connect-redis');

const configurePassportSettings = (app) => {
  const RedisStore = redisStoreFactory(expressSession);

  app.use(expressSession({
    store: new RedisStore({
      host: '127.0.0.1',
      port: 6379,
    }), secret: 'hey you',
    resave: true,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use('local', new Strategy(UserModel.authenticate()));
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());
};

const configureRoutes = () => {
};

exports.configure = (app) => {
  configurePassportSettings(app);
  configureRoutes(app);
};
