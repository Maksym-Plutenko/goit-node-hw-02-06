const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_UA_EMAIL, META_UA_PASSWORD, HOST} = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2525,
  secure: true,
  auth: {
    user: META_UA_EMAIL,
    pass: META_UA_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmailByNodemailer = async (email, token) => {
  const emailSettings = {
    from: META_UA_EMAIL,
    to: email,
    subject: "Email verification",
    text: `<a href="${HOST}/api/users/verify/${token}">Please, verify your email by click on this link</a>`,
  };
  await transport.sendMail(emailSettings);
  return true;
};

module.exports = sendEmailByNodemailer;
