const moongoose = require("mongoose");
require("dotenv").config();

// console.log(process.env.DB_URI);

const app = require("./app");

// const DB_HOST = "mongodb+srv://mongouser:ltbg6VlExAvgLPKz@cluster0.lhresdv.mongodb.net/db-contacts?retryWrites=true&w=majority";
moongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

