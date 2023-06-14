const multer = require("multer");
const path = require('path');

const tempDir = path.join(__dirname, "..", "temp");
// con log
console.log(tempDir);

const config = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({
  storage: config,
});

module.exports = upload;
