const Mailjet = require("node-mailjet");
require("dotenv").config();

// const mailjet = Mailjet.apiConnect(
//   process.env.MJ_APIKEY_PUBLIC,
//   process.env.MJ_APIKEY_PRIVATE,
// );

// const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL} = process.env;

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "00a7a4e867873fcc2ef8db4877c360b7",
  apiSecret:
    process.env.MJ_APIKEY_PRIVATE || "3e51a968c586923dfbd7622c98b6c679",
});

// request
//   .then((result) => {
//     console.log(result.body);
//   })
//   .catch((err) => {
//     console.log(err.statusCode);
//   });

const sendMail = async (email, token) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.MJ_SENDER_EMAIL,
          Name: "Verification service",
        },
        To: [
          {
            Email: email,
            Name: "user",
          },
        ],
        Subject: "Verificate you email",
        TextPart:
          "Dear user, welcome to Mailjet! May the delivery force be with you!",
        HTMLPart: `<h3>Dear user, welcome to <a href="${process.env.HOST}/api/users/verify/${token}">Click me</a>!</h3><br />May the delivery force be with you!`,
      },
    ],
  });

  // try {
  //   const result = await request;
  //   console.log(result.body);
  // } catch (err) {
  //   console.log(err);
  // }

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports = sendMail;
