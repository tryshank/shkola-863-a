const Router = require('express');
const router = new Router();
const EmailService = require('../../utils/EmailService');
const { readSettings } = require('../ReadSettings');

router.post('/', (req, res) => {
  if (req.body) {
    const settings = readSettings();
    settings.then(
      data => {
        // to, from, subject, text
        const { name, phone, email, message } = req.body;
        const subject = process.env.ENV_MAIL_SUBJECT || 'Contact form from your website';
        const to = data.mail.adminEmail;
        const text = `Name: ${name}\nE-mail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
        console.log(`send e-mail to ${settings.adminEmail}`);
        EmailService.send(to, email, subject, text)
          .then(
            result => res.status(200).send({ result: true }).end(),
            err => res.status(500).send({ result: false, err }).end()
          );
      },
      err => {
        res.status(500).send({ result: false, err }).end();
      });
  } else {
    const err = 'no data specified';
    console.log(err);
    res.status(500).send({ result: false, err }).end();
  }
});

module.exports = router;
