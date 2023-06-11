const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
} = require("../../models/contacts");

const { answer } = require("../../utilites/answer");
const { validateBody } = require("../../utilites/validate");
const { auth } = require("../../utilites/auth");

router.get("/", auth, async (req, res, next) => {
  const contacts = await listContacts(req.user._id);
  res.json(answer(contacts, 200));
});

router.get("/:contactId", auth, async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const contactById = await getContactById(id);
    if (contactById) {
      res.json(answer(contactById, 200));
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/", auth, async (req, res, next) => {
  validateBody(req, res);

  const { name, email, phone } = req.body;
  const owner = req.user._id;

  try {
    const newContact = await addContact({ name, email, phone, owner });
    res.status(201).json(answer(newContact, 201));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/:contactId", auth, async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const deletedContact = await removeContact(id);
    if (deletedContact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put("/:contactId", auth, async (req, res, next) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;

  validateBody(req, res);

  try {
    const updatedContact = await updateContact(id, { name, email, phone });
    if (updatedContact) {
      res.json(answer(updatedContact, 200));
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.patch("/:contactId/favorite", auth, async (req, res, next) => {
  const id = req.params.contactId;
  const { favorite } = req.body;

  try {
    const updatedContact = await updateContactFavorite(id, favorite);
    if (updatedContact) {
      res.json(answer(updatedContact, 200));
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
