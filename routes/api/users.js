const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');

const { validateUser } = require("../../utilites/validate");
const { auth } = require("../../utilites/auth");
const {
  register,
  findUserByEmail,
  getToken,
  findUserById,
  removeToken,
} = require("../../models/users");

const KEY = process.env.KEY;

router.post("/register", async (req, res, next) => {
  validateUser(req, res);
  req.body.avatarURL = gravatar.url(req.body.email);

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const newUser = await register(req);
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

module.exports = router;
