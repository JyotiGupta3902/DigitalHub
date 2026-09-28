const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  serviceType: {
    type: String,
    required: true,
  },
  estimatedBudget: {
    type: String,
  },
  projectDetails: {
    type: String,
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Contacted', 'Closed'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Inquiry', InquirySchema);
