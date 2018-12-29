var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const MailDev = require('maildev');

const maildev = new MailDev();

maildev.listen();

maildev.on('new', email => {
  console.log(`Received new email with subject: ${email.subject}`);
});

const transport = nodemailer.createTransport({
  port: 1025,
  ignoreTLS: true
});

/* GET cookies page. */
router.get('/', (req, res) => {
  transport.sendMail(
    {
      from: 'Arlen Wild <arlen@wild.com>',
      to: 'supergrandma@yopmail.com',
      subject: 'Cookies, URGENT !!',
      text:
        "Bonsoir mamie, j'ai vraiment besoin de ta recette de cookies !!!! C'est pour Noël à la wild !!",
      html:
        "<b>Bonsoir mamie, j'ai vraiment besoin de ta recette de cookies !!!! C'est pour Noël à la wild !!</b>"
    },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + response.message);
        res.render('cookies', { title: 'New cookie mail sent!' });
      }
    }
  );
});

module.exports = router;
