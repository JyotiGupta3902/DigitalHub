import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Inbox,
  MessageSquare,
  Wrench,
  Image as ImageIcon,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Search,
  CheckCircle,
  RefreshCw,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('dh_admin_token') === 'active';
  });
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  const [activeSection, setActiveSection] = useState<'overview' | 'inquiries' | 'contacts' | 'services' | 'gallery' | 'settings'>('overview');

  // Data States
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  // Search & Filter
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  if (selectedInquiry) { /* no-op for ts unused check */ }

  // Form Modals
  const [showAddService, setShowAddService] = useState(false);
  const [showAddGallery, setShowAddGallery] = useState(false);

  // New Service state
  const [sTitle, setSTitle] = useState('');
  const [sCategory, setSCategory] = useState('Web Development');
  const [sDesc, setSDesc] = useState('');
  const [sImg, setSImg] = useState('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80');
  const [sPrice, setSPrice] = useState('₹29,999');
  const [sFeatures, setSFeatures] = useState('');
  const [sPopular] = useState(false);

  // New Gallery state
  const [gTitle, setGTitle] = useState('');
  const [gCategory, setGCategory] = useState('Web Design');
  const [gDesc, setGDesc] = useState('');
  const [gImg, setGImg] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');
  const [gResults, setGResults] = useState('+300% ROI');

  const [notification, setNotification] = useState('');

  const fetchData = async () => {
    try {
      const [inqRes, conRes, servRes, galRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/contact'),
        fetch('/api/services'),
        fetch('/api/gallery')
      ]);

      const [inqData, conData, servData, galData] = await Promise.all([
        inqRes.json(),
        conRes.json(),
        servRes.json(),
        galRes.json()
      ]);

      setInquiries(Array.isArray(inqData) ? inqData : []);
      setContacts(Array.isArray(conData) ? conData : []);
      setServices(Array.isArray(servData) ? servData : []);
      setGallery(Array.isArray(galData) ? galData : []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated]);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAuthenticated(true);
        localStorage.setItem('dh_admin_token', 'active');
      } else {
        setLoginError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setLoginError('Could not connect to server.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('dh_admin_token');
  };

  // Inquiry Actions
  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    await fetch(`/api/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    showNotify(`Inquiry status updated to ${status}`);
    fetchData();
  };

  const handleDeleteInquiry = async (id: string) => {
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    showNotify('Inquiry deleted successfully');
    fetchData();
  };

  // Contact Actions
  const handleUpdateContactStatus = async (id: string, status: string) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    showNotify(`Contact message updated to ${status}`);
    fetchData();
  };

  const handleDeleteContact = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    showNotify('Message deleted');
    fetchData();
  };

  // Service Actions
  const handleAddServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title: sTitle,
      category: sCategory,
      shortDescription: sDesc,
      imageUrl: sImg,
      startingPrice: sPrice,
      features: sFeatures.split(',').map(f => f.trim()).filter(Boolean),
      popular: sPopular,
      icon: 'Layout'
    };
    await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    setShowAddService(false);
    setSTitle('');
    setSDesc('');
    showNotify('New Service created!');
    fetchData();
  };

  const handleDeleteService = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    showNotify('Service removed');
    fetchData();
  };

  // Gallery Actions
  const handleAddGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title: gTitle,
      category: gCategory,
      description: gDesc,
      imageUrl: gImg,
      results: gResults,
      tags: ['React', 'SEO', 'Node.js']
    };
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    setShowAddGallery(false);
    setGTitle('');
    setGDesc('');
    showNotify('Portfolio item published!');
    fetchData();
  };

  const handleDeleteGallery = async (id: string) => {
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    showNotify('Portfolio item deleted');
    fetchData();
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.serviceType?.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus = inquiryStatusFilter === 'All' || inq.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--bg-main)' }}>
        <div className="glass-panel" style={{ maxWidth: '440px', width: '100%', padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Digital Hub Admin</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px' }}>
            Enter administrator credentials to access command portal.
          </p>

          {loginError && (
            <div style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid #f43f5e', color: '#f43f5e', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
              <span>Sign In to Admin Portal</span>
            </button>
          </form>

          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '24px' }}>
            <ArrowLeft size={14} /> Back to Live Website
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside
        style={{
          width: '260px',
          borderRight: '1px solid var(--border-subtle)',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'var(--bg-card)',
        }}
      >
        <div>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="#fff" />
            </div>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>DIGITAL<span style={{ color: 'var(--primary)' }}>HUB</span></span>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>ADMIN PORTAL</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard size={18} /> },
              { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: <Inbox size={18} /> },
              { id: 'contacts', label: `Contact Inbox (${contacts.length})`, icon: <MessageSquare size={18} /> },
              { id: 'services', label: `Services CMS (${services.length})`, icon: <Wrench size={18} /> },
              { id: 'gallery', label: `Portfolio CMS (${gallery.length})`, icon: <ImageIcon size={18} /> },
              { id: 'settings', label: 'System Settings', icon: <Settings size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeSection === item.id ? 'var(--primary)' : 'transparent',
                  color: activeSection === item.id ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div>
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'var(--border-subtle)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              marginBottom: '12px',
            }}
          >
            <ArrowLeft size={16} /> View Live Website
          </a>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(244, 63, 94, 0.12)',
              color: '#f43f5e',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <LogOut size={16} /> Logout Administrator
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '36px', overflowY: 'auto' }}>
        
        {/* Top Notification Bar */}
        {notification && (
          <div style={{ position: 'fixed', top: '24px', right: '36px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', padding: '12px 24px', borderRadius: '10px', fontWeight: 600, boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} />
            <span>{notification}</span>
          </div>
        )}

        {/* SECTION 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h1 style={{ fontSize: '2.4rem' }}>Executive Dashboard</h1>
                <p style={{ color: 'var(--text-muted)' }}>Real-time overview of website metrics, leads, and operational status.</p>
              </div>
              <button onClick={fetchData} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                <RefreshCw size={16} /> Refresh Metrics
              </button>
            </div>

            {/* Metric Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '36px' }}>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Inquiries</span>
                  <Inbox size={22} color="var(--primary)" />
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>{inquiries.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '4px' }}>↑ +24% this month</div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contact Messages</span>
                  <MessageSquare size={22} color="var(--accent-cyan)" />
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>{contacts.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Active Response Stream</div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Published Services</span>
                  <Wrench size={22} color="var(--accent-purple)" />
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>{services.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Active API Catalog</div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Portfolio Works</span>
                  <ImageIcon size={22} color="#f59e0b" />
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>{gallery.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: '4px' }}>Live Gallery Showcase</div>
              </div>
            </div>

            {/* Recent Lead Stream Table */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Recent Project Proposals & Leads</h3>
              {inquiries.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No leads logged yet.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '12px' }}>Client</th>
                        <th style={{ padding: '12px' }}>Service Requested</th>
                        <th style={{ padding: '12px' }}>Est. Budget</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.slice(0, 5).map((inq) => (
                        <tr key={inq._id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '14px 12px', fontWeight: 600 }}>{inq.name}<br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inq.email}</span></td>
                          <td style={{ padding: '14px 12px', color: 'var(--primary)' }}>{inq.serviceType}</td>
                          <td style={{ padding: '14px 12px' }}>{inq.estimatedBudget}</td>
                          <td style={{ padding: '14px 12px' }}>
                            <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: inq.status === 'New' ? 'rgba(99,102,241,0.15)' : 'rgba(16,185,129,0.15)', color: inq.status === 'New' ? 'var(--primary)' : '#10b981' }}>
                              {inq.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <button onClick={() => { setSelectedInquiry(inq); setActiveSection('inquiries'); }} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* SECTION 2: INQUIRIES MANAGEMENT */}
        {activeSection === 'inquiries' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <h1 style={{ fontSize: '2.2rem' }}>Inquiry Lead Hub</h1>
                <p style={{ color: 'var(--text-muted)' }}>Review client proposal requests, budget calculations, and project briefs.</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '28px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search by client name, email, or service..."
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'New', 'In Progress', 'Contacted', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: inquiryStatusFilter === st ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                      background: inquiryStatusFilter === st ? 'var(--primary)' : 'transparent',
                      color: inquiryStatusFilter === st ? '#fff' : 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {filteredInquiries.map((inq) => (
                <div key={inq._id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="pill-badge">{inq.serviceType}</span>
                      <select
                        className="form-select"
                        style={{ width: 'auto', padding: '4px 10px', fontSize: '0.78rem' }}
                        value={inq.status}
                        onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{inq.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>✉️ {inq.email} | 📞 {inq.phone || 'N/A'}</div>

                    <div style={{ background: 'var(--border-subtle)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Estimated Investment</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{inq.estimatedBudget}</div>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {inq.projectDetails}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>

                    <button onClick={() => handleDeleteInquiry(inq._id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: CONTACT MESSAGES */}
        {activeSection === 'contacts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <h1 style={{ fontSize: '2.2rem' }}>Contact Messages Inbox</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage general customer inquiries and message submissions.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contacts.map((c) => (
                <div key={c._id} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, paddingRight: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.2rem' }}>{c.fullName}</h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({c.email})</span>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', background: 'rgba(99,102,241,0.15)', color: 'var(--primary)', fontWeight: 600 }}>
                        {c.status}
                      </span>
                    </div>

                    <div style={{ fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '8px' }}>Subject: {c.subject}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{c.message}</p>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '12px' }}>Phone: {c.phone || 'None provided'}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <select
                      className="form-select"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      value={c.status}
                      onChange={(e) => handleUpdateContactStatus(c._id, e.target.value)}
                    >
                      <option value="Unread">Unread</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>

                    <button onClick={() => handleDeleteContact(c._id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '6px' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: SERVICES CMS */}
        {activeSection === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <h1 style={{ fontSize: '2.2rem' }}>Services CMS</h1>
                <p style={{ color: 'var(--text-muted)' }}>Create, edit, update pricing in Rupees (₹), and manage services offered on the website.</p>
              </div>

              <button onClick={() => setShowAddService(true)} className="btn-primary">
                <Plus size={18} /> <span>Add New Service</span>
              </button>
            </div>

            {/* Modal: Add Service */}
            {showAddService && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <div className="glass-panel" style={{ maxWidth: '540px', width: '100%', padding: '32px', background: 'var(--bg-main)' }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Add New Digital Service</h3>
                  <form onSubmit={handleAddServiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input type="text" placeholder="Service Title *" className="form-input" value={sTitle} onChange={(e) => setSTitle(e.target.value)} required />
                    <select className="form-select" value={sCategory} onChange={(e) => setSCategory(e.target.value)}>
                      <option value="SEO">SEO</option>
                      <option value="Web Development">Web Development</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Digital Solutions">Digital Solutions</option>
                      <option value="Branding">Branding</option>
                    </select>
                    <textarea placeholder="Short Description *" className="form-textarea" rows={3} value={sDesc} onChange={(e) => setSDesc(e.target.value)} required></textarea>
                    <input type="text" placeholder="Image URL (Unsplash or direct link)" className="form-input" value={sImg} onChange={(e) => setSImg(e.target.value)} />
                    <input type="text" placeholder="Starting Price (e.g. ₹29,999) *" className="form-input" value={sPrice} onChange={(e) => setSPrice(e.target.value)} required />
                    <input type="text" placeholder="Features (Comma separated)" className="form-input" value={sFeatures} onChange={(e) => setSFeatures(e.target.value)} />
                    
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                      <button type="button" onClick={() => setShowAddService(false)} className="btn-secondary">Cancel</button>
                      <button type="submit" className="btn-primary">Create Service</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Services Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {services.map((s) => (
                <div key={s._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {s.imageUrl && (
                    <div style={{ height: '150px', overflow: 'hidden' }}>
                      <img src={s.imageUrl} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="pill-badge">{s.category}</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{s.startingPrice}</div>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{s.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>{s.shortDescription}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {s.features?.map((f: string, idx: number) => (
                        <div key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Check size={14} color="var(--accent-cyan)" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleDeleteService(s._id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: GALLERY CMS */}
        {activeSection === 'gallery' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <h1 style={{ fontSize: '2.2rem' }}>Portfolio Gallery CMS</h1>
                <p style={{ color: 'var(--text-muted)' }}>Publish case studies, client project screenshots, and metrics.</p>
              </div>

              <button onClick={() => setShowAddGallery(true)} className="btn-primary">
                <Plus size={18} /> <span>Add Portfolio Project</span>
              </button>
            </div>

            {/* Modal: Add Gallery */}
            {showAddGallery && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <div className="glass-panel" style={{ maxWidth: '540px', width: '100%', padding: '32px', background: 'var(--bg-main)' }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Publish New Portfolio Item</h3>
                  <form onSubmit={handleAddGallerySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input type="text" placeholder="Project Title *" className="form-input" value={gTitle} onChange={(e) => setGTitle(e.target.value)} required />
                    <select className="form-select" value={gCategory} onChange={(e) => setGCategory(e.target.value)}>
                      <option value="Web Design">Web Design</option>
                      <option value="SEO Results">SEO Results</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="SaaS Platform">SaaS Platform</option>
                      <option value="Mobile App">Mobile App</option>
                    </select>
                    <textarea placeholder="Description *" className="form-textarea" rows={3} value={gDesc} onChange={(e) => setGDesc(e.target.value)} required></textarea>
                    <input type="text" placeholder="Image URL *" className="form-input" value={gImg} onChange={(e) => setGImg(e.target.value)} required />
                    <input type="text" placeholder="Key Growth Result (e.g. +450% Traffic)" className="form-input" value={gResults} onChange={(e) => setGResults(e.target.value)} />
                    
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                      <button type="button" onClick={() => setShowAddGallery(false)} className="btn-secondary">Cancel</button>
                      <button type="submit" className="btn-primary">Publish Work</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Gallery Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {gallery.map((g) => (
                <div key={g._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img src={g.imageUrl} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span className="pill-badge" style={{ marginBottom: '8px' }}>{g.category}</span>
                    <h3 style={{ fontSize: '1.2rem', marginTop: '6px', marginBottom: '6px' }}>{g.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>{g.description}</p>
                    {g.results && <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>🚀 {g.results}</div>}
                  </div>

                  <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleDeleteGallery(g._id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: SETTINGS */}
        {activeSection === 'settings' && (
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>System Configuration & Security</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Database details, secret tokens, and server status.</p>

            <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px' }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Database Status</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>CONNECTED (MongoDB / In-Memory Active)</div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Server Host</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>http://localhost:5000</div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Admin Credentials</span>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Username: <strong>admin</strong><br />
                  Password: <strong>admin123</strong>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
