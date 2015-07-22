var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
transporter.sendMail({
    from: 'sender@address.com',
    to: 'receiver@address.com',
    subject: 'hello',
    text: 'hello world!'
});
