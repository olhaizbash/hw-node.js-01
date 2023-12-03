const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("db", "contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
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
listContacts();
async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await listContacts();
    const contactFind = contacts.find((contact) => contact.id === contactId);
    if (contactFind === undefined) {
      return null;
    }
    return contactFind;
  } catch (error) {
    console.log(error.message);
  }
}
getContactById("AeHIrLTr6JkxGE6SN-0Rw");
async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
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
// removeContact("rsKkOQUi80UsgVPCcLZZW");

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
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
// addContact("helo", "a@hidden", "55555");

module.exports = {
  removeContact,
  listContacts,
  getContactById,
  addContact,
};
