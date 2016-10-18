const Router = require('express');
const router = new Router();
const EmailService = require('../../utils/EmailService');

router.post('/', (req, res) => {
  console.log('send-mail router');
  console.log(req.body);
  if (req.body) {
    // to, from, subject, text
    console.log(req.body);
    const { name, phone, email, message } = req.body;
    const subject = process.env.ENV_MAIL_SUBJECT || 'Contact form from your website';
    const to = process.env.ENV_MAIL_ADMIN_EMAIL || process.env.ENV_MAIL_USER;
    const text = `Name: ${name}\nE-mail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    EmailService.send(to, email, subject, text)
      .then(
        result => res.status(200).send({ result: true }).end(),
        err => res.status(500).send({ result: false, err }).end()
      );
  } else {
    const err = 'no data specified';
    console.log(err);
    res.status(500).send({ result: false, err }).end();
  }
});

module.exports = router;
