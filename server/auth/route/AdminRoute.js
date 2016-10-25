const Router = require('express');
const router = new Router();
const { ensureAuthenticated } = require('../middleware/AuthMiddleware');
const AdminModel = require('../model/AdminModel');
const { readSettings } = require('../ReadSettings');

router.get('/email', ensureAuthenticated, (req, res) => {
  const settings = readSettings();
  settings.then(
    result =>
      res.status(200).send(result).end()
  ).catch(
    err =>
      res.status(500).send(err).end()
  );
});

// save settings
router.put('/email', ensureAuthenticated, (req, res) => {
  if (req.body && req.body.adminEmail) {
    const { adminEmail } = req.body;
    console.log('set admin email to: ', adminEmail);
    AdminModel.findOneAndUpdate({}, { $set: { adminEmail } }, { new: true })
      .then(
        result => {
          res.status(200).send({ result: true }).end();
        },
        err => {
          console.log(err);
          res.status(500).send({ result: false, err }).end();
        }
      );
  } else {
    res.status(400).send({ result: false, err: 'no data received' }).end();
  }
});

module.exports = router;
