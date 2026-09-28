import React, { useState, useEffect } from 'react';
import { Globe, PhoneCall, ShieldCheck, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '14px 0' : '22px 0',
        background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
            }}
          >
            <Globe size={24} color="#fff" />
          </div>
          <div>
            <span
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-heading)',
              }}
            >
              DIGITAL<span style={{ color: 'var(--primary)' }}>HUB</span>
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '-3px',
              }}
            >
              Lucknow, UP
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#home" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-main)', transition: 'color 0.2s' }}>Home</a>
          <a href="#services" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Services</a>
          <a href="#estimator" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Price Estimator</a>
          <a href="#gallery" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Gallery</a>
          <a href="#why-us" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Why Us</a>
          <a href="#contact" style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Contact</a>
        </div>

        {/* CTA Buttons, WhatsApp Chat & Admin Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* WhatsApp Direct Action Button */}
          <a
            href="https://wa.me/919455348347?text=Hello%20Digital%20Hub,%20I%20want%20to%20discuss%20a%20project!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid #10b981',
              color: '#059669',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
            title="Chat on WhatsApp (+91 9455348347)"
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>

          {/* Admin Portal Trigger */}
          <button
            onClick={onOpenAdmin}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
            title="Admin Portal Login"
          >
            <ShieldCheck size={16} color="var(--primary)" />
            <span>Admin</span>
          </button>

          <button onClick={onOpenQuote} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <PhoneCall size={16} />
            <span>Get Quote</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
