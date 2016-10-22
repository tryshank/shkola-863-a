const Router = require('express');
const router = new Router();
const EmailService = require('../../utils/EmailService');
const { readSettings } = require('../ReadSettings');

router.post('/', (req, res) => {
  if (req.body) {
    const settings = readSettings();
    console.log(settings);
    settings.then(
      data => {
        // to, from, subject, text
        console.log(data);
        const { name, phone, email, message } = req.body;
        const subject = process.env.ENV_MAIL_SUBJECT || 'Contact form from your website';
        const to = data.email.adminEmail;
        const text = `Name: ${name}\nE-mail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
        console.log(`send e-mail to ${data.email.adminEmail}`);
        return EmailService.send(to, email, subject, text);
      },
      err => {
        console.log(err);
        res.status(500).send({ result: false, err }).end();
      })
    .then(
      result => res.status(200).send({ result: true }).end(),
      err => {
        console.log(err);
        res.status(500).send({ result: false, err }).end();
      }
    );
  } else {
    const err = 'no data specified';
    console.log(err);
    res.status(400).send({ result: false, err }).end();
  }
});

module.exports = router;
