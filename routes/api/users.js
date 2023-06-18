const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const upload = require("../../utilites/upload");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { validateUser } = require("../../utilites/validate");
const { auth } = require("../../utilites/auth");
const {
  register,
  findUserByEmail,
  getToken,
  findUserById,
  removeToken,
  updateAvatar,
  findUserByToken,
  verifyEmail,
} = require("../../models/users");
const sendEmailByNodemailer = require("../../utilites/sendMailByNodemailer");

const KEY = process.env.KEY;

router.post("/register", async (req, res, next) => {
  validateUser(req, res);
  req.body.avatarURL = gravatar.url(req.body.email);
  const token = nanoid();
  req.body.verificationToken = token;

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const newUser = await register(req);

    await sendEmailByNodemailer(newUser.email, token);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      console.log("Email in use");
      res.status(409).json({ message: "Email in use" });
    } else {
      console.log(err);
      next(err);
    }
  }
});

router.post("/login", async (req, res, next) => {
  validateUser(req, res);

  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    const passwordsAreIdentical = await bcrypt.compare(password, user.password);

    if (passwordsAreIdentical) {
      if (user.verify) {
        const payload = { id: user._id };
        const token = jwt.sign(payload, KEY, { expiresIn: "23h" });

        const modifiedUser = await getToken(user._id, token);

        res.status(200).json({
          token: modifiedUser.token,
          user: {
            email: modifiedUser.email,
            subscription: modifiedUser.subscription,
          },
        });
      } else {
        res.status(401).json({ message: "Please, verify your email!" });
      }
    } else {
      res.status(401).json({ message: "Email or password is wrong" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  const id = req.user._id;
  const user = await findUserById(id);

  try {
    const user = await findUserById(id);
    if (!user || !user.token) {
      res.status(401).json({ message: "Not authorized" });
    } else {
      const modifiedUser = await removeToken(id);
      res.status(204).json({});
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/current", auth, async (req, res, next) => {
  const id = req.user._id;

  try {
    const user = await findUserById(id);
    if (!user || !user.token) {
      res.status(401).json({ message: "Not authorized" });
    } else {
      res.status(200).json({
        email: user.email,
        subscription: user.subscription,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    const id = req.user._id;
    const { path: previousName, originalname } = req.file;
    const newShortName = `${id}_${originalname}`;
    const newFullName = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "avatars",
      newShortName
    );

    try {
      await fs.rename(previousName, newFullName);

      const picture = await Jimp.read(newFullName);
      picture.resize(250, 250).write(newFullName);

      const modifiedUser = await updateAvatar(id, `avatars/${newShortName}`);

      res.status(200).json({
        avatarURL: modifiedUser.avatarURL,
      });
    } catch (err) {
      await fs.unlink(previousName);
      return next(err);
    }
  }
);

router.get("/verify/:verificationToken", async (req, res, next) => {
  const token = req.params.verificationToken;

  try {
    const user = await findUserByToken(token);
    if (user) {
      await verifyEmail(user._id);
      res.status(200).json({
        message: "Verification successful",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/verify", async (req, res, next) => {
  const email = req.body.email;

  if (email) {
    try {
      const user = await findUserByEmail(email);
      if (user.verify) {
        res
          .status(400)
          .json({ message: "Verification has already been passed" });
      } else {
        await sendEmailByNodemailer(user.email, user.verificationToken);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.status(400).json({ message: "missing required field emaild" });
  }
});

module.exports = router;
