const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const { validateUser } = require("../../utilites/validate");
const { register, findUser } = require("../../models/users");

const KEY = process.env.KEY;

router.post("/register", async (req, res, next) => {
  validateUser(req, res);

  try {
    const newUser = await register(req);
    res.status(201).json(newUser);
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
    const user = await findUser(email);

    if (user.password === password) {

      const payload = {email};
      const token = jwt.sign(payload, KEY);

      res.status(200).json({
        token,
        user: {
          email,
          subscription: user.subscription,
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

router.post("/logout", async (req, res, next) => {});

router.get("/current", async (req, res, next) => {});

module.exports = router;
