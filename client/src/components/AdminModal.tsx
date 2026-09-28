import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, Trash2, RefreshCw } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'inquiries' | 'contacts' | 'addService' | 'addGallery'>('inquiries');

  // Data lists
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  // Add Service Form State
  const [servTitle, setServTitle] = useState('');
  const [servCategory, setServCategory] = useState('Web Development');
  const [servShortDesc, setServShortDesc] = useState('');
  const [servPrice, setServPrice] = useState('$999');
  const [servFeatures, setServFeatures] = useState('');

  // Add Gallery Form State
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState('Web Design');
  const [galDesc, setGalDesc] = useState('');
  const [galImgUrl, setGalImgUrl] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');
  const [galResults, setGalResults] = useState('+250% Growth');

  const [msg, setMsg] = useState('');

  const fetchData = async () => {
    try {
      const inqRes = await fetch('/api/inquiries');
      const inqData = await inqRes.json();
      setInquiries(inqData);

      const conRes = await fetch('/api/contact');
      const conData = await conRes.json();
      setContacts(conData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated]);

  if (!isOpen) return null;

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
      } else {
        setLoginError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setLoginError('Could not connect to server.');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    setInquiries(inquiries.filter((i) => i._id !== id));
  };

  const handleDeleteContact = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    setContacts(contacts.filter((c) => c._id !== id));
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = servFeatures.split(',').map((f) => f.trim()).filter(Boolean);
    const body = {
      title: servTitle,
      category: servCategory,
      shortDescription: servShortDesc,
      startingPrice: servPrice,
      features: featArray,
      icon: 'Layout',
    };
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setMsg('Service added successfully!');
        setServTitle('');
        setServShortDesc('');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title: galTitle,
      category: galCategory,
      description: galDesc,
      imageUrl: galImgUrl,
      results: galResults,
      tags: ['MERN', 'SEO', 'React'],
    };
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setMsg('Gallery item created!');
        setGalTitle('');
        setGalDesc('');
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(16px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          background: 'var(--bg-main)',
          color: 'var(--text-main)',
          overflowY: 'auto',
          padding: '36px',
          position: 'relative',
          border: '1px solid var(--border-glow)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={24} />
        </button>

        {!authenticated ? (
          /* Login Screen */
          <div style={{ maxWidth: '400px', margin: '40px auto 20px auto', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary)', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={28} color="#fff" />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Admin Dashboard Login</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px' }}>
              Default credentials prefilled below for testing.
            </p>

            {loginError && (
              <div style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid #f43f5e', padding: '10px', borderRadius: '8px', color: '#f43f5e', fontSize: '0.85rem', marginBottom: '16px' }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="text"
                placeholder="Username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                <ShieldCheck size={18} />
                <span>Login to Admin Portal</span>
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Content */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck color="var(--primary)" />
                  Digital Hub Control Panel
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Authenticated as administrator</p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={fetchData} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                  <RefreshCw size={14} /> Refresh
                </button>
                <button onClick={() => setAuthenticated(false)} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                  Logout
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid var(--border-glow)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>Inquiries Received</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{inquiries.length}</div>
              </div>
              <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid var(--border-glow)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>Contact Messages</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{contacts.length}</div>
              </div>
              <div style={{ background: 'rgba(168, 85, 247, 0.12)', border: '1px solid var(--border-glow)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 700, textTransform: 'uppercase' }}>Active System Status</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginTop: '6px' }}>ONLINE (MERN API)</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <button
                onClick={() => setActiveTab('inquiries')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'inquiries' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'inquiries' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                Inquiries ({inquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'contacts' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'contacts' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                Contact Msgs ({contacts.length})
              </button>
              <button
                onClick={() => setActiveTab('addService')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'addService' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'addService' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                + Add Service
              </button>
              <button
                onClick={() => setActiveTab('addGallery')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'addGallery' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'addGallery' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                + Add Portfolio Item
              </button>
            </div>

            {msg && (
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
                {msg}
              </div>
            )}

            {/* TAB: Inquiries */}
            {activeTab === 'inquiries' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {inquiries.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No inquiries found.</p>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq._id} style={{ background: 'var(--border-subtle)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{inq.name} <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>({inq.email})</span></div>
                        <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', marginTop: '2px', fontWeight: 600 }}>{inq.serviceType} | Budget: {inq.estimatedBudget}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{inq.projectDetails}</div>
                      </div>
                      <button onClick={() => handleDeleteInquiry(inq._id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: Contacts */}
            {activeTab === 'contacts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {contacts.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No contact messages found.</p>
                ) : (
                  contacts.map((c) => (
                    <div key={c._id} style={{ background: 'var(--border-subtle)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{c.fullName} <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>({c.email})</span></div>
                        <div style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>Subject: {c.subject}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{c.message}</div>
                      </div>
                      <button onClick={() => handleDeleteContact(c._id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: Add Service */}
            {activeTab === 'addService' && (
              <form onSubmit={handleAddService} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input type="text" placeholder="Service Title" className="form-input" value={servTitle} onChange={(e) => setServTitle(e.target.value)} required />
                <select className="form-select" value={servCategory} onChange={(e) => setServCategory(e.target.value)}>
                  <option value="SEO">SEO</option>
                  <option value="Web Development">Web Development</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Digital Solutions">Digital Solutions</option>
                </select>
                <textarea placeholder="Short Description" className="form-textarea" rows={2} value={servShortDesc} onChange={(e) => setServShortDesc(e.target.value)} required></textarea>
                <input type="text" placeholder="Starting Price (e.g. $999)" className="form-input" value={servPrice} onChange={(e) => setServPrice(e.target.value)} required />
                <input type="text" placeholder="Features (Comma separated)" className="form-input" value={servFeatures} onChange={(e) => setServFeatures(e.target.value)} />
                <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Save Service</button>
              </form>
            )}

            {/* TAB: Add Gallery */}
            {activeTab === 'addGallery' && (
              <form onSubmit={handleAddGallery} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input type="text" placeholder="Project Title" className="form-input" value={galTitle} onChange={(e) => setGalTitle(e.target.value)} required />
                <select className="form-select" value={galCategory} onChange={(e) => setGalCategory(e.target.value)}>
                  <option value="Web Design">Web Design</option>
                  <option value="SEO Results">SEO Results</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="SaaS Platform">SaaS Platform</option>
                </select>
                <textarea placeholder="Project Description" className="form-textarea" rows={2} value={galDesc} onChange={(e) => setGalDesc(e.target.value)} required></textarea>
                <input type="text" placeholder="Image URL (Unsplash or direct link)" className="form-input" value={galImgUrl} onChange={(e) => setGalImgUrl(e.target.value)} required />
                <input type="text" placeholder="Key Metric / Result (e.g. +350% Traffic)" className="form-input" value={galResults} onChange={(e) => setGalResults(e.target.value)} />
                <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Publish Portfolio Item</button>
              </form>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
