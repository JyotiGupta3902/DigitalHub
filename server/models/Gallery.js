const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Web Design', 'SEO Results', 'E-Commerce', 'SaaS Platform', 'Mobile App'],
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
  },
  tags: [{ type: String }],
  results: {
    type: String, // e.g. "+320% Organic Traffic", "5x Conversion Rate"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Gallery', GallerySchema);
