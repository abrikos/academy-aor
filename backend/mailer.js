require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});
//console.log(process.env.MAIL_PASSWORD)
//transporter.verify().then(console.log).catch(console.error);

module.exports = transporter