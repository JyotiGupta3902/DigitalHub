const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { getDBStatus } = require('../config/db');

let memoryContacts = [
  {
    _id: 'c-1',
    fullName: 'Alex Vance',
    email: 'alex.vance@apexgroup.com',
    phone: '+1 (555) 987-6543',
    subject: 'Web Development Inquiry',
    message: 'We are looking to rebuild our company website with React and MongoDB.',
    status: 'Unread',
    createdAt: new Date()
  }
];

// @route GET /api/contact
router.get('/', async (req, res) => {
  if (getDBStatus()) {
    try {
      const list = await Contact.find().sort({ createdAt: -1 });
      return res.json(list);
    } catch (e) {
      console.error(e);
    }
  }
  res.json(memoryContacts);
});

// @route POST /api/contact
router.post('/', async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: 'Full name, email, and message are required' });
  }

  const payload = {
    fullName,
    email,
    phone: phone || '',
    subject: subject || 'General Inquiry',
    message,
    status: 'Unread',
  };

  if (getDBStatus()) {
    try {
      const dbContact = new Contact(payload);
      const saved = await dbContact.save();
      return res.status(201).json({ success: true, contact: saved });
    } catch (e) {
      console.error(e);
    }
  }

  const newContact = { ...payload, _id: Date.now().toString(), createdAt: new Date() };
  memoryContacts.unshift(newContact);
  res.status(201).json({ success: true, message: 'Message sent successfully!', contact: newContact });
});

// @route PUT /api/contact/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (getDBStatus()) {
    try {
      const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true });
      return res.json({ success: true, contact: updated });
    } catch (e) {
      console.error(e);
    }
  }
  const item = memoryContacts.find(c => c._id === id);
  if (item) {
    item.status = status;
    return res.json({ success: true, contact: item });
  }
  res.status(404).json({ message: 'Contact message not found' });
});

// @route DELETE /api/contact/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (getDBStatus()) {
    try {
      await Contact.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Message deleted' });
    } catch (e) {
      console.error(e);
    }
  }
  memoryContacts = memoryContacts.filter(c => c._id !== id);
  res.json({ success: true, message: 'Message deleted' });
});

module.exports = router;
