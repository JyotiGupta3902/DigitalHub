import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, subject, message }),
      });
      const data = await res.json();

      if (res.ok) {
        setSent(true);
        setFullName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        setErrorMsg(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <MessageSquare size={14} color="var(--primary)" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 style={{ fontSize: '2.6rem', marginBottom: '16px' }}>
            Let’s Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Have a project in mind or need expert technical SEO guidance? Reach out directly via Email, WhatsApp, or Contact Form.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '48px' }}>
          
          {/* Left Contact Info */}
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Contact Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              
              {/* Email */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={22} color="var(--primary)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Email Us</span>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    <a href="mailto:guptajyoti3696@gmail.com" style={{ color: 'var(--text-main)', textDecoration: 'underline' }}>
                      guptajyoti3696@gmail.com
                    </a>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Typical response time: under 2 hours</div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={22} color="#10b981" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Call / WhatsApp Chat</span>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    <a
                      href="https://wa.me/919455348347?text=Hello%20Digital%20Hub,%20I%20want%20to%20discuss%20a%20project!"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      +91 9455348347 (Click to WhatsApp)
                    </a>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Available 24/7 for instant consultation</div>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={22} color="var(--accent-purple)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Headquarters Location</span>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                    Lucknow, Near CMS Aliganj Campus 1
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Uttar Pradesh, India</div>
                </div>
              </div>

            </div>

            {/* Google Maps Embed Location Card */}
            <div className="glass-panel" style={{ overflow: 'hidden', padding: '0', borderRadius: '16px', marginBottom: '24px' }}>
              <iframe
                title="Office Location Map"
                src="https://maps.google.com/maps?q=CMS%20Aliganj%20Campus%201%20Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>

            {/* Operating Hours Box */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Clock size={20} color="var(--primary)" />
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>Working Hours</h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Monday – Saturday: 9:00 AM – 7:00 PM IST<br />
                Sunday: WhatsApp & Emergency On-Call Support
              </p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="glass-panel" style={{ padding: '40px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={56} color="var(--accent-cyan)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-main)' }}>Thank You for Reaching Out!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '24px' }}>
                  Your message has been logged in our system. A project director will get back to you shortly.
                </p>
                <button onClick={() => setSent(false)} className="btn-secondary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-main)' }}>Send Us a Message</h3>

                {errorMsg && (
                  <div style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid #f43f5e', padding: '12px', borderRadius: '8px', color: '#f43f5e', fontSize: '0.9rem' }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9455348347"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Subject</label>
                    <input
                      type="text"
                      className="form-input"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Website Rebuild"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Message *</label>
                  <textarea
                    className="form-textarea"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Tell us about your business goals, project scope, or timeline..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center', marginTop: '8px' }}>
                  <Send size={18} />
                  <span>{loading ? 'Sending Message...' : 'Send Message Now'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
