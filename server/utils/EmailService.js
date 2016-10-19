const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  `smtps://${process.env.ENV_MAIL_USER}:${process.env.ENV_MAIL_PASSWORD}
   @${process.env.ENV_MAIL_SERVER}`);

exports.send = (to, from, subject, text) => {
  const mailOptions = { to, from, subject, text };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

