import React, { useState } from 'react';
import { Calculator, CheckCircle2, Send } from 'lucide-react';

interface QuoteCalculatorProps {
  initialService?: string;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ initialService }) => {
  const [serviceType, setServiceType] = useState<string>(initialService || 'Custom Business Website');
  const [projectSize, setProjectSize] = useState<string>('Medium (5-10 Pages)');
  const [addons, setAddons] = useState<string[]>(['SEO Package']);
  
  // Contact details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Price Calculation Logic in INR (₹)
  const getEstimatedPrice = () => {
    let base = 29999;
    if (serviceType.includes('SEO')) base = 14999;
    if (serviceType.includes('E-Commerce')) base = 49999;
    if (serviceType.includes('Full-Stack') || serviceType.includes('MERN')) base = 79999;

    if (projectSize.includes('Medium')) base += 10000;
    if (projectSize.includes('Enterprise')) base += 35000;

    let addonTotal = addons.length * 5000;
    const minVal = base + addonTotal;
    const maxVal = base + addonTotal + 15000;
    return {
      min: minVal.toLocaleString('en-IN'),
      max: maxVal.toLocaleString('en-IN'),
    };
  };

  const handleAddonToggle = (addonName: string) => {
    if (addons.includes(addonName)) {
      setAddons(addons.filter((a) => a !== addonName));
    } else {
      setAddons([...addons, addonName]);
    }
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    const est = getEstimatedPrice();
    const payload = {
      name,
      email,
      phone,
      serviceType: `${serviceType} (${projectSize})`,
      estimatedBudget: `₹${est.min} - ₹${est.max}`,
      projectDetails: `Addons: ${addons.join(', ')}. Details: ${details}`,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const estimated = getEstimatedPrice();

  return (
    <section id="estimator" className="section-padding" style={{ background: 'var(--border-subtle)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <Calculator size={14} color="var(--primary)" />
            <span>TRANSPARENT ESTIMATOR</span>
          </div>
          <h2 style={{ fontSize: '2.6rem', marginBottom: '16px' }}>
            Calculate Your <span className="text-gradient">Project Investment</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Select your requirements below for an instant real-time price estimate in Rupees (₹) and customized proposal.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '36px' }}>
          
          {/* Left Form Selection */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            {/* Step 1: Select Service */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                1. Select Service Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  'Enterprise Technical SEO',
                  'Custom Business Website',
                  'E-Commerce Online Store',
                  'Full-Stack MERN Web App',
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setServiceType(st)}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: serviceType === st ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                      background: serviceType === st ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-main)',
                      color: serviceType === st ? 'var(--primary)' : 'var(--text-muted)',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scale / Scope */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                2. Project Scope & Scale
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {['Startup (1-4 Pages)', 'Medium (5-10 Pages)', 'Enterprise (10+ Pages / Custom API)'].map((ps) => (
                  <button
                    key={ps}
                    type="button"
                    onClick={() => setProjectSize(ps)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: projectSize === ps ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                      background: projectSize === ps ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-main)',
                      color: projectSize === ps ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {ps}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on options */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '12px', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                3. Optional Add-ons & Extras
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  'SEO Audit & Keyword Silos',
                  'Admin CMS Control Panel',
                  '24/7 Security & Hosting',
                  'Lighthouse 95+ Speed Guarantee',
                ].map((addon) => {
                  const isChecked = addons.includes(addon);
                  return (
                    <div
                      key={addon}
                      onClick={() => handleAddonToggle(addon)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: isChecked ? '1px solid var(--accent-purple)' : '1px solid var(--border-subtle)',
                        background: isChecked ? 'rgba(168, 85, 247, 0.12)' : 'var(--bg-main)',
                        color: isChecked ? 'var(--text-main)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                      }}
                    >
                      <input type="checkbox" checked={isChecked} onChange={() => {}} />
                      <span>{addon}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary & Proposal Submission */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Estimated Investment</span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                ₹{estimated.min} - ₹{estimated.max}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                * Includes 1 year warranty, SSL, mobile optimization, and code delivery.
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={48} color="var(--accent-cyan)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-main)' }}>Proposal Request Sent!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Our senior technical strategist will review your requirements and reach out within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-main)' }}>Receive Official Written Proposal</h4>

                <input
                  type="text"
                  placeholder="Your Full Name *"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Business Email *"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  placeholder="Additional project details or target launch date..."
                  className="form-textarea"
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>

                <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center', width: '100%', marginTop: '8px' }}>
                  <Send size={18} />
                  <span>{loading ? 'Submitting...' : 'Submit Inquiry & Lock Rate'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
