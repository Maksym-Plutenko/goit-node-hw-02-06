const express = require("express");

const router = express.Router();

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

// router.get("/", async (req, res, next) => {
//   const contacts = await listContacts();
//   res.json(answer(contacts, 200));
// });

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(answer(contacts, 200));
});

router.get("/:contactId", async (req, res, next) => {
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

  // await getContactById(req, res, next);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  validateBody(req, res);

  try {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(answer(newContact, 201));   // exception
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const deletedContact = await removeContact(id);
    if (deletedContact) {
      res.status(200).json({ message: "contact deleted" });   //exception
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
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

router.patch("/:contactId/favorite", async (req, res, next) => {
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
