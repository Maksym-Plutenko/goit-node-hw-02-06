const express = require('express')

const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { answer } = require("../../utilites/answer")

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json(answer(contacts, 200));
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (contactById) {
    res.json(answer(contactById, 200));
  } else {
    res.status(404).json({ message: 'Not found' });
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(answer(newContact, 201));
  } else {
    res.status(404).json({ message: 'missing required name field' });
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
