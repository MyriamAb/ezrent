/* import { Nodemailer } from '@nestjs-modules/mailer'
 */
const Nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const transport = Nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a4d15c48ccd1ba",
    pass: "fe7ca2d17c37c4"
  }
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport.sendMail({
    from: "GIRLPOWER",
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5000/users/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};