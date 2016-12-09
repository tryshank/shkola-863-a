const Router = require('express');
const router = new Router();
const AboutModel = require('../model/AboutModel');

// get about
router.get('/', (req, res) => {
  AboutModel.find().exec((err, docs) => {
    if (err) {
      res.status(500).send({ result: false, err }).end();
    } else {
      res.status(200).json({ docs }).end();
    }
    return null;
  });
});

// save about
router.post('/', (req, res) => {
  if (req.body && req.body.adminAboutLeft && req.body.adminAboutRight) {
    const { adminAboutLeft, adminAboutRight } = req.body;
    AboutModel.findOneAndUpdate({}, { $set: { adminAboutLeft, adminAboutRight } }, { new: true })
      .then(
        result => {
          res.status(200).send({ result: true }).end();
        },
        err => {
          res.status(500).send({ result: false, err }).end();
        }
      );
  } else {
    res.status(400).send({ result: false, err: 'no data received' }).end();
  }
});

module.exports = router;
