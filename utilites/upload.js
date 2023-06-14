const multer = require("multer");
const patch = require("path");

const tempDir = patch("..", __dirname, "temp");
// con log
console.log(tempDir);

const config = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
