const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { getDBStatus } = require('../config/db');

let memoryInquiries = [
  {
    _id: 'inq-1',
    name: 'Sarah Jenkins',
    email: 'sarah@techflow.io',
    phone: '+1 (555) 234-5678',
    serviceType: 'Enterprise Technical SEO',
    estimatedBudget: '$2,500 - $5,000',
    projectDetails: 'Looking to audit our SaaS blog and fix indexing issues before Q3.',
    status: 'New',
    createdAt: new Date()
  }
];

// @route GET /api/inquiries
router.get('/', async (req, res) => {
  if (getDBStatus()) {
    try {
      const list = await Inquiry.find().sort({ createdAt: -1 });
      return res.json(list);
    } catch (e) {
      console.error(e);
    }
  }
  res.json(memoryInquiries);
});

// @route POST /api/inquiries
router.post('/', async (req, res) => {
  const { name, email, phone, serviceType, estimatedBudget, projectDetails } = req.body;

  if (!name || !email || !serviceType) {
    return res.status(400).json({ message: 'Name, email, and service type are required' });
  }

  const payload = {
    name,
    email,
    phone,
    serviceType,
    estimatedBudget: estimatedBudget || '$1,000+',
    projectDetails,
    status: 'New',
  };

  if (getDBStatus()) {
    try {
      const dbInquiry = new Inquiry(payload);
      const saved = await dbInquiry.save();
      return res.status(201).json({ success: true, inquiry: saved });
    } catch (e) {
      console.error(e);
    }
  }

  const newInquiry = { ...payload, _id: Date.now().toString(), createdAt: new Date() };
  memoryInquiries.unshift(newInquiry);
  res.status(201).json({ success: true, message: 'Inquiry submitted successfully', inquiry: newInquiry });
});

// @route PUT /api/inquiries/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (getDBStatus()) {
    try {
      const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
      return res.json({ success: true, inquiry: updated });
    } catch (e) {
      console.error(e);
    }
  }
  const item = memoryInquiries.find(i => i._id === id);
  if (item) {
    item.status = status;
    return res.json({ success: true, inquiry: item });
  }
  res.status(404).json({ message: 'Inquiry not found' });
});

// @route DELETE /api/inquiries/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (getDBStatus()) {
    try {
      await Inquiry.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Inquiry deleted' });
    } catch (e) {
      console.error(e);
    }
  }
  memoryInquiries = memoryInquiries.filter(i => i._id !== id);
  res.json({ success: true, message: 'Inquiry deleted' });
});

module.exports = router;
