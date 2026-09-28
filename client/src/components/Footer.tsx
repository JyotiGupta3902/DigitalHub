import React from 'react';
import { Globe, Mail, ArrowUp, MapPin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border-subtle)', paddingTop: '80px', paddingBottom: '40px', transition: 'background-color 0.3s ease' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '40px', marginBottom: '60px' }}>
          
          {/* Col 1: Brand & Contact Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Globe size={20} color="#fff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                DIGITAL<span style={{ color: 'var(--primary)' }}>HUB</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              “Grow Your Business in the Digital World.”<br />
              SEO, Websites & Digital Solutions That Help Your Business Grow.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--primary)" />
                <a href="mailto:guptajyoti3696@gmail.com" style={{ color: 'var(--text-main)' }}>guptajyoti3696@gmail.com</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={16} color="#10b981" />
                <a href="https://wa.me/919455348347" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', fontWeight: 600 }}>+91 9455348347 (WhatsApp)</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--accent-purple)" />
                <span>Lucknow, Near CMS Aliganj Campus 1, UP</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://wa.me/919455348347" target="_blank" rel="noopener noreferrer" title="WhatsApp Chat" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={18} color="#10b981" />
              </a>
              <a href="mailto:guptajyoti3696@gmail.com" title="Email Us" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} color="var(--primary)" />
              </a>
              <a href="#contact" title="Location" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} color="var(--text-muted)" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: 'var(--text-main)' }}>Quick Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <a href="#home">Home</a>
              <a href="#services">Our Services</a>
              <a href="#estimator">Price Estimator</a>
              <a href="#gallery">Portfolio & Gallery</a>
              <a href="#why-us">Why Choose Us</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: 'var(--text-main)' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <a href="#services">Enterprise Technical SEO</a>
              <a href="#services">Custom Business Websites</a>
              <a href="#services">Full-Stack Web Applications</a>
              <a href="#services">E-Commerce Platforms</a>
              <a href="#services">Local SEO & Google Business</a>
              <a href="#services">Brand Identity & UX Design</a>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: 'var(--text-main)' }}>Digital Hub Insights</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Subscribe to get monthly technical SEO strategies and web development tips.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="email" placeholder="Your Email Address" className="form-input" style={{ padding: '10px 14px', fontSize: '0.85rem' }} />
              <button className="btn-primary" style={{ padding: '10px 14px' }}>
                <Mail size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            © {new Date().getFullYear()} Digital Hub Company, Lucknow. All rights reserved. Built with MERN Stack.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'var(--border-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
};
