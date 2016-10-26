const Router = require('express');
const passport = require('passport');
const UserModel = require('../model/UserModel');
const { ensureAuthenticated } = require('../middleware/AuthMiddleware');

const router = new Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('logged in');
  res.status(200).send('logged in');
});

const checkPassword = (req, res, next) => {
  if (req.body.adminPassword === process.env.ENV_REGISTRATION_ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).end();
  }
};

router.post('/register', checkPassword, (req, res) => {
  const userModel = new UserModel({ username: req.body.username });
  UserModel.register(
    userModel,
    req.body.password,
    (err, account) => {
      if (err) {
        res.status(401).send(err);
      } else {
        passport.authenticate('local')(
          req,
          res,
          () => {
            res.redirect('/admin');
          }
        );
      }
    }
  );
});

router.get('/isLoggedIn', ensureAuthenticated);

module.exports = router;
