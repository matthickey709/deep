var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
transporter.sendMail({
    from: 'sender@address',
    to: 'spandan.777@gmail.com',
    subject: 'hello',
    text: 'hello world!'
});
