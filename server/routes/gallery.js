const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { getDBStatus } = require('../config/db');

const defaultGallery = [
  {
    _id: 'g1',
    title: 'FinTech Enterprise Platform',
    category: 'SaaS Platform',
    description: 'Real-time financial analytics dashboard with custom charts, bank integrations, and high-frequency data streaming.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/fintech',
    tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    results: '+450% User Engagement'
  },
  {
    _id: 'g2',
    title: 'Luxury E-Commerce Brand',
    category: 'E-Commerce',
    description: 'High-end minimalist online shop featuring 3D product previews, instant checkout, and personalized recommendations.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/luxury',
    tags: ['Next.js', 'Stripe', 'Tailwind', 'Three.js'],
    results: '$2.4M Revenue in Q1'
  },
  {
    _id: 'g3',
    title: 'Global Healthtech SEO Takeover',
    category: 'SEO Results',
    description: 'Comprehensive technical SEO overhaul resulting in top 3 Google positions for 140+ competitive medical keywords.',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/health',
    tags: ['Technical SEO', 'Schema Markup', 'Core Web Vitals'],
    results: '+620% Organic Traffic'
  },
  {
    _id: 'g4',
    title: 'Urban Real Estate Hub',
    category: 'Web Design',
    description: 'Interactive property listings with virtual tours, neighborhood score maps, and instant lead capture funnel.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/realestate',
    tags: ['React', 'Google Maps API', 'Express'],
    results: '8.4x Lead Conversion'
  },
  {
    _id: 'g5',
    title: 'CyberSecurity Portal App',
    category: 'Mobile App',
    description: 'Cross-platform mobile application providing threat monitoring, biometric authentication, and push alerts.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/cyber',
    tags: ['React Native', 'WebSockets', 'JWT Auth'],
    results: '100k+ Active Downloads'
  },
  {
    _id: 'g6',
    title: 'Automotive SaaS Marketplace',
    category: 'Web Design',
    description: 'Multi-vendor marketplace platform connecting vehicle buyers with certified dealers across North America.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/auto',
    tags: ['MERN Stack', 'Redux', 'AWS S3'],
    results: '300% Dealer Signups'
  }
];

let memoryGallery = [...defaultGallery];

// @route GET /api/gallery
router.get('/', async (req, res) => {
  if (getDBStatus()) {
    try {
      const items = await Gallery.find();
      if (items.length > 0) return res.json(items);
    } catch (e) {
      console.error(e);
    }
  }
  res.json(memoryGallery);
});

// @route POST /api/gallery
router.post('/', async (req, res) => {
  if (getDBStatus()) {
    try {
      const dbItem = new Gallery(req.body);
      const saved = await dbItem.save();
      return res.status(201).json(saved);
    } catch (e) {
      console.error(e);
    }
  }
  const newItem = { ...req.body, _id: Date.now().toString(), createdAt: new Date() };
  memoryGallery.push(newItem);
  res.status(201).json(newItem);
});

// @route PUT /api/gallery/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (getDBStatus()) {
    try {
      const updated = await Gallery.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    } catch (e) {
      console.error(e);
    }
  }
  const index = memoryGallery.findIndex(g => g._id === id);
  if (index !== -1) {
    memoryGallery[index] = { ...memoryGallery[index], ...req.body };
    return res.json(memoryGallery[index]);
  }
  res.status(404).json({ message: 'Item not found' });
});

// @route DELETE /api/gallery/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (getDBStatus()) {
    try {
      await Gallery.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Item deleted' });
    } catch (e) {
      console.error(e);
    }
  }
  memoryGallery = memoryGallery.filter(g => g._id !== id);
  res.json({ success: true, message: 'Item deleted' });
});

module.exports = router;
