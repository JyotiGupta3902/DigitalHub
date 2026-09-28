const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['SEO', 'Web Development', 'Digital Solutions', 'E-Commerce', 'Mobile Apps', 'Branding'],
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  icon: {
    type: String,
    default: 'Globe',
  },
  features: [{ type: String }],
  startingPrice: {
    type: String,
    default: '$499',
  },
  popular: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
