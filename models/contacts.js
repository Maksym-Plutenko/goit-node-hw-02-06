// const fs = require("fs").promises;
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

const Contact = require("./schemas/contact");

const listContacts = async () => {
  // const contacts = await fs.readFile(contactsPath);
  // return JSON.parse(contacts);
  return Contact.find();
}

const getContactById = async (contactId) => {
  // const id = String(contactId);
  // const contacts = await listContacts();
  // const selectedContact = contacts.find((cont) => cont.id === id);
  // return selectedContact || null;
  return Contact.findById(contactId);
}

const removeContact = async (contactId) => {
  const id = String(contactId);
  // const contacts = await listContacts();
  // const index = contacts.findIndex((cont) => cont.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // const [result] = contacts.splice(index, 1);
  // const newFileContent = JSON.stringify(contacts, null, 2);
  // await fs.writeFile(contactsPath, newFileContent);
  // return result;
  return Contact.findByIdAndDelete(id);
}

const addContact = async (body) => {
  // const { name, email, phone } = body;
  // const contacts = await listContacts();
  // const createdContact = {
  //   id: nanoid(),
  //   name,
  //   email,
  //   phone,
  // };
  // const newContacts = [...contacts, createdContact];
  // const newFileContent = JSON.stringify(newContacts, null, 2);
  // await fs.writeFile(contactsPath, newFileContent);
  // return createdContact;
  return Contact.create(body);
}

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  // const { name, email, phone } = body;
  // const contacts = await listContacts();
  // const index = contacts.findIndex((cont) => cont.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // contacts[index] = {
  //   id,
  //   name, 
  //   email, 
  //   phone
  // }
  // const newFileContent = JSON.stringify(contacts, null, 2);
  // await fs.writeFile(contactsPath, newFileContent);
  // return contacts[index];
  return findByIdAndUpdate(id, body, {new: true});
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
