const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all Contacts
//@route GET api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  res.status(200).json(contact);
});

//@desc Get one Contacts
//@route GET api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact is not found");
  }
  res.status(200).json(contact);
  //   res.status(200).json({ message: `only one contact ${req.params.id}` });
});

//@desc post Contacts
//@route POST api/contacts
//@access public

const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

//@desc update Contacts
//@route PUT api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact is not found");
  }
  const updatedCoontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedCoontact);
});

//@desc delete Contacts
//@route DElETE api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact is not found");
  }
  await Contact.findByIdAndRemove(req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  postContact,
  updateContact,
  deleteContact,
};
