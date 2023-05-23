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

// function send(result) {
//   // const 
//   return {
//       status: 'success',
//       code: 200,
//       data: {
//         result
//       },
//   }
// }

router.get('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const contacts = await listContacts();

  // res.json({
  //   status: 'success',
  //   code: 200,
  //   data: {
  //     contacts,
  //   },
  // });

  res.json(answer(contacts, 200));
})

router.get('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (contactById) {
    //
  } else {
    //
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
