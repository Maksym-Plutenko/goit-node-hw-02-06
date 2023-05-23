const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// get array of ALL contacts
async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

// get one contact by id
async function getContactById(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const selectedContact = contacts.find((cont) => cont.id === id);
  return selectedContact || null;
}

// remove one contact by id from contacts.json
async function removeContact(contactId) {
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

// add contact to contacts.json
async function addContact(name, email, phone) {
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
  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
