import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle, Code, Search, Globe, Zap } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const techLogos = [
    '🌐 Enterprise SEO',
    '⚡ React 19',
    '🎨 Figma UI/UX',
    '💎 MERN Stack',
    '📦 Node.js REST API',
    '📊 Core Web Vitals 99+',
    '📈 Google Business Rank',
    '🛒 Scalable E-Commerce',
    '🔐 SSL & Security',
    '🌐 Enterprise SEO',
    '⚡ React 19',
    '🎨 Figma UI/UX',
    '💎 MERN Stack',
    '📦 Node.js REST API',
    '📊 Core Web Vitals 99+',
  ];

  return (
    <section id="home" style={{ paddingTop: '160px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Rotating Ambient Glow Ring */}
      <div
        className="animate-spin-slow"
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      ></div>

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Hero Content */}
          <div>
            <div className="pill-badge" style={{ marginBottom: '24px' }}>
              <Sparkles size={14} color="var(--primary)" />
              <span>DIGITAL SERVICES AGENCY</span>
            </div>

            <h1 style={{ fontSize: '3.6rem', lineHeight: 1.1, marginBottom: '20px' }}>
              Grow Your Business in the <span className="text-gradient">Digital World.</span>
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '580px', lineHeight: 1.6 }}>
              SEO, Websites & Digital Solutions That Help Your Business Grow. We build enterprise SEO campaigns, custom high-converting web applications, and digital platforms in Lucknow, UP & Worldwide.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <button onClick={onOpenQuote} className="btn-primary animate-pulse-glow" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                <span>Get Free Proposal</span>
                <ArrowRight size={18} />
              </button>
              <a href="#services" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                <span>Explore Services</span>
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>99.4% Client Retention</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} color="var(--accent-purple)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Google Certified SEO</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Fast 14-Day Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Floating Card Visual */}
          <div style={{ position: 'relative' }}>
            
            <div
              className="glass-panel animate-float shimmer-card"
              style={{
                padding: '36px',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              }}
            >
              {/* Header inside card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>digitalhub-analytics.v2</span>
              </div>

              {/* Stats Box 1 */}
              <div
                style={{
                  background: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Organic Traffic Growth</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>+348%</div>
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={24} color="#fff" />
                </div>
              </div>

              {/* Grid Features Mini */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: 'var(--border-subtle)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <Search size={20} color="var(--accent-cyan)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>#1 Rank</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Keywords</div>
                </div>

                <div style={{ background: 'var(--border-subtle)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <Globe size={20} color="var(--accent-purple)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>99/100</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lighthouse Speed</div>
                </div>
              </div>

              {/* Floating Badge Overlay 1 (Bottom Left) */}
              <div
                className="animate-float-delayed"
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(6, 182, 212, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Code size={20} color="#fff" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>250+ Projects Delivered</span>
              </div>

              {/* Floating Badge Overlay 2 (Top Right) */}
              <div
                className="animate-float"
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-16px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Zap size={16} color="#fff" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>99.9% Uptime SLA</span>
              </div>

            </div>
          </div>

        </div>

        {/* Continuous Animated Marquee Ticker */}
        <div style={{ marginTop: '72px', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '16px 0' }}>
          <div className="marquee-container">
            <div className="marquee-content">
              {techLogos.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    background: 'var(--border-subtle)',
                    padding: '8px 18px',
                    borderRadius: '999px',
                  }}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
