const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const dotenv = require("dotenv");

dotenv.config({ path: `./config.env` });

const auth = {
  service: "gmail",
  host: "smtp.gmail.com",
  //  port:465,
  // secure:true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
};

const transporter = nodemailer.createTransport(smtpTransport(auth));

const sendEmail = (name, mail, subject, text, cb) => {
  const mailOptions = {
    from: `${name} ${mail}`,
    to: process.env.USER,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      cb(error, null);
      console.log(error);
    } else {
      cb(null, info);
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
