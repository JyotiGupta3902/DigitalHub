const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { getDBStatus } = require('../config/db');

// Default initial services dataset with Indian Rupees (₹) pricing & accurate E-Commerce photo
const defaultServices = [
  {
    _id: '1',
    title: 'Enterprise Technical SEO',
    category: 'SEO',
    shortDescription: 'Dominating search rankings with deep technical audits, schema markup, and speed optimizations.',
    fullDescription: 'Our technical SEO services focus on crawling, indexing, site structure, core web vitals, and high-authority backlink strategies that position your enterprise at the top of Google.',
    imageUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800&q=80',
    icon: 'TrendingUp',
    features: ['Technical Audit & Schema', 'Keyword Strategy & Content Silos', 'High Authority Backlinks', 'Core Web Vitals Optimization', 'Monthly Ranking Reports'],
    startingPrice: '₹14,999/mo',
    popular: true,
  },
  {
    _id: '2',
    title: 'Custom Business Websites',
    category: 'Web Development',
    shortDescription: 'High-converting, lightning-fast web applications built with React, Vite, & Next.js.',
    fullDescription: 'Crafted with sleek modern design, glassmorphism UI, interactive elements, and flawless mobile responsiveness to turn site visitors into paying clients.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    icon: 'Layout',
    features: ['Custom React / Modern Framework', 'Fully Responsive Mobile Design', 'CMS / Admin Control Panel', 'SEO & Speed Optimized (95+ Lighthouse)', 'SSL & Security Hardening'],
    startingPrice: '₹29,999',
    popular: true,
  },
  {
    _id: '3',
    title: 'E-Commerce Platforms',
    category: 'E-Commerce',
    shortDescription: 'Scalable online stores with automated payment gateways, inventory management, and high checkout ROI.',
    fullDescription: 'End-to-end e-commerce solutions supporting custom product builders, Razorpay/UPI/Stripe checkout, inventory automation, and multi-currency support.',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
    icon: 'ShoppingBag',
    features: ['UPI, Razorpay & Stripe Payment', 'Order & Inventory Automation', 'Custom Product Configurator', 'Abandoned Cart Recovery', 'Analytics & Sales Dashboard'],
    startingPrice: '₹49,999',
    popular: false,
  },
  {
    _id: '4',
    title: 'Full-Stack Web Applications',
    category: 'Digital Solutions',
    shortDescription: 'Bespoke MERN SaaS products, internal tools, dashboard analytics, and custom API backends.',
    fullDescription: 'Architecting scalable serverless or microservice backends, real-time database management, user authorization, and cloud deployment.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    icon: 'Code2',
    features: ['MERN Stack Architecture', 'RESTful API & GraphQL Integrations', 'Real-time WebSocket Push', 'Database Optimization (MongoDB / Postgres)', 'CI/CD & Cloud Deployment'],
    startingPrice: '₹79,999',
    popular: true,
  },
  {
    _id: '5',
    title: 'Local SEO & Google Business',
    category: 'SEO',
    shortDescription: 'Drive local foot traffic & phone calls with GMB rank takeover and local citation building.',
    fullDescription: 'Optimized local search engine domination designed specifically for service-based businesses, local franchises, and retail brands.',
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    icon: 'MapPin',
    features: ['Google Business Profile Takeover', 'Local Citation Building', 'Review Generation Strategy', 'Geotargeted Content Pages'],
    startingPrice: '₹9,999/mo',
    popular: false,
  },
  {
    _id: '6',
    title: 'Brand Identity & UX Design',
    category: 'Branding',
    shortDescription: 'Stunning visual identities, UI design systems, interactive prototypes, and luxury branding.',
    fullDescription: 'Create a distinctive brand image with custom logo suites, Figma visual design systems, brand guidelines, and high-converting UX copywriting.',
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    icon: 'Sparkles',
    features: ['Complete Logo & Brand Kit', 'Figma UI/UX Prototypes', 'Design System & Assets', 'UX Copywriting'],
    startingPrice: '₹19,999',
    popular: false,
  }
];

let memoryServices = [...defaultServices];

// @route GET /api/services
router.get('/', async (req, res) => {
  if (getDBStatus()) {
    try {
      const services = await Service.find();
      if (services.length > 0) return res.json(services);
    } catch (e) {
      console.error(e);
    }
  }
  res.json(memoryServices);
});

// @route POST /api/services
router.post('/', async (req, res) => {
  const newService = { ...req.body };
  if (getDBStatus()) {
    try {
      const dbService = new Service(req.body);
      const saved = await dbService.save();
      return res.status(201).json(saved);
    } catch (e) {
      console.error(e);
    }
  }
  const memService = { ...newService, _id: Date.now().toString(), createdAt: new Date() };
  memoryServices.push(memService);
  res.status(201).json(memService);
});

// @route PUT /api/services/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (getDBStatus()) {
    try {
      const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    } catch (e) {
      console.error(e);
    }
  }
  const index = memoryServices.findIndex(s => s._id === id);
  if (index !== -1) {
    memoryServices[index] = { ...memoryServices[index], ...req.body };
    return res.json(memoryServices[index]);
  }
  res.status(404).json({ message: 'Service not found' });
});

// @route DELETE /api/services/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (getDBStatus()) {
    try {
      await Service.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Service deleted' });
    } catch (e) {
      console.error(e);
    }
  }
  memoryServices = memoryServices.filter(s => s._id !== id);
  res.json({ success: true, message: 'Service deleted' });
});

module.exports = router;
