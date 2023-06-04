const moongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

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
