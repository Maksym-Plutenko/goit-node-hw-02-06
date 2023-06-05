const express = require("express");

const { register } = require("../../models/users");

// const { answer } = require("../../utilites/answer");
const { validateUser } = require("../../utilites/validate");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    // console.log("test test");
  validateUser(req, res);
//   console.log("test test 222");
  try {
    const newUser = await register(req);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {});

router.post("/logout", async (req, res, next) => {});

router.get("/current", async (req, res, next) => {});

module.exports = router;
