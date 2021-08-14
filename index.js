const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

var transporter = nodemailer.createTransport({
    host: 'krieger.asoshared.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.mail,
      pass: process.env.password
    }
});
  
app.get('/', function(req, res) { 
    res.send('Hello World!');
})

app.get('/email-test', function(req, res) { 
    try {
        var mailOptions = {
            from: 'dont@forgetmy.email',
            to: 'dont@forgetmy.email',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(500)
                res.send({ error: error })
            } else {
                console.log('Email sent: ' + info.response);
                res.send('email sent');
            }
        });
    } catch(e) {
        console.log(e);
        res.status(500)
        res.send({ error: e })
    }
})
app.listen(port);