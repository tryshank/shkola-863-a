const Router = require('express');
const router = new Router();
const AdminModel = require('../model/AdminModel');
const { ensureAuthenticated } = require('../middleware/AuthMiddleware');

router.get('/email', ensureAuthenticated, (req, res) => {
  AdminModel.findOne({}, { _id: 0 })
    .then(
      mail =>
        res.status(200).send({ result: true, mail }).end()
      ,
      err => {
        console.log(err);
        res.status(500).send({ result: false, err }).end();
      }
    );
});


// put-edit/update
router.put('/email', ensureAuthenticated, (req, res) => {
  console.log(req.body.adminEmail);
  if (req.body && req.body.adminEmail) {
    const { adminEmail } = req.body;
    console.log('set admin email to: ', adminEmail);
    AdminModel.findOneAndUpdate({}, { $set: { adminEmail } }, { new: true })
      .then(
        result => {
          if (result.adminEmail === adminEmail) {
            res.status(200).send({ result: true }).end();
          } else {
            const err = 'update failed';
            res.status(500).send({ result: false, err }).end();
          }
        },
        err => {
          console.log(err);
          res.status(500).send({ result: false, err }).end();
        }
      );
  } else {
    res.status(500).send({ result: false, err: 'no data received' }).end();
  }
});

module.exports = router;
