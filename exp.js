const sendMail = require("./utilites/sendMail");

const main = async () => {
    await sendMail("plutenkom@meta.ua", "1234567890");
}

main();

// const Mailjet = require("node-mailjet");
// require("dotenv").config();

// const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

// const mailjet = new Mailjet({
//   apiKey: MJ_APIKEY_PUBLIC,
//   apiSecret: MJ_APIKEY_PRIVATE,
// });

// const request = mailjet.post("send", { version: "v3.1" }).request({
//   Messages: [
//     {
//       From: {
//         Email: MJ_SENDER_EMAIL,
//         Name: "Verification service",
//       },
//       To: [
//         {
//           Email: "plutenkom@gmail.com",
//           Name: "user",
//         },
//       ],
//       Subject: "Verificate you email",
//       TextPart:
//         "Dear user, welcome to Mailjet! May the delivery force be with you!",
//       HTMLPart: `<h3>Dear user, welcome to <a href="https://www.mailjet.com/api/users/verify/2222">Click me</a>!</h3><br />May the delivery force be with you!`,
//     },
//   ],
// });

// request
//   .then((result) => {
//     console.log(result.body);
//   })
//   .catch((err) => {
//     console.log(err.statusCode);
//   });
