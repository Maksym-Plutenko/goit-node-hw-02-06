const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const selectedContact = contacts.find((cont) => cont.id === id);
  return selectedContact || null;
}

const removeContact = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((cont) => cont.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  const newFileContent = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, newFileContent);
  return result;
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const createdContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const newContacts = [...contacts, createdContact];
  const newFileContent = JSON.stringify(newContacts, null, 2);
  await fs.writeFile(contactsPath, newFileContent);
  return createdContact;
}

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex((cont) => cont.id === id);
  if (index === -1) {
    return null;
  }
  // contacts[index].name = name;
  // contacts[index].email = email;
  // contacts[index].phone = phone;
  contacts[index] = {
    id,
    name, 
    email, 
    phone
  }
  const newFileContent = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, newFileContent);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
