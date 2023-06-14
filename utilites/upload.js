const multer = require("multer");
const path = require('path');

const tempDir = path.join(__dirname, "..", "tmp");

const config = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({
  storage: config,
});

module.exports = upload;
