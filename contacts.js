const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("db", "contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  try {
    const contactsRead = await fs.readFile(contactsPath, {
      encoding: "utf8",
    });
    const contacts = JSON.parse(contactsRead);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactFind = contacts.find((contact) => contact.id === contactId);
    if (!contactFind) {
      return null;
    }
    return contactFind;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactDelete = contacts.filter(
      (contact) => contact.id === contactId
    );
    if (contactDelete === undefined) {
      return null;
    }
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), {
      encoding: "utf8",
      flag: "w",
    });
    return contactDelete;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), {
      encoding: "utf8",
      flag: "w",
    });
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  removeContact,
  listContacts,
  getContactById,
  addContact,
};
