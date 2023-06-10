const Contact = require("./schemas/contact");

// const { wrapper } = require("../utilites/wrappers");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  return Contact.findByIdAndDelete(id);
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  return Contact.findByIdAndUpdate(id, body, { new: true });
};

const updateContactFavorite = async (contactId, favorite) => {
  const id = String(contactId);
  return Contact.findByIdAndUpdate(id, { favorite }, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavorite,
};
