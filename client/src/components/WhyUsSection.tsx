import React from 'react';
import { ShieldCheck, Gauge, Cpu, BarChart3, Clock, Lock } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const points = [
    {
      icon: <Gauge size={32} color="var(--accent-cyan)" />,
      title: 'Lighthouse 95+ Guarantee',
      desc: 'Every website we build is optimized for Core Web Vitals with instant sub-second page loads.',
    },
    {
      icon: <BarChart3 size={32} color="var(--primary)" />,
      title: 'Data-Driven Technical SEO',
      desc: 'No guesswork. We engineer content silos, schema markup, and backlink strategies based on real ranking analytics.',
    },
    {
      icon: <Cpu size={32} color="var(--accent-purple)" />,
      title: 'Modern MERN & React Stack',
      desc: 'Built with TypeScript, Vite, React, Node.js, and MongoDB for maximum scalability and zero bloat.',
    },
    {
      icon: <ShieldCheck size={32} color="#10b981" />,
      title: '100% Transparent Pricing',
      desc: 'No hidden surprise fees. Clear milestone deliverables, weekly status demos, and code ownership.',
    },
    {
      icon: <Clock size={32} color="#f59e0b" />,
      title: 'Rapid 14-Day Delivery',
      desc: 'Agile development workflow gets your custom website or landing page live in record turnaround time.',
    },
    {
      icon: <Lock size={32} color="#ec4899" />,
      title: 'Enterprise Security Built-in',
      desc: 'SSL encryption, CORS protection, rate-limiting, and hardened backend security standard on all projects.',
    },
  ];

  return (
    <section id="why-us" className="section-padding" style={{ background: 'rgba(15, 23, 42, 0.3)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <ShieldCheck size={14} color="#a5b4fc" />
            <span>THE DIGITAL HUB ADVANTAGE</span>
          </div>
          <h2 style={{ fontSize: '2.6rem', marginBottom: '16px' }}>
            Why Leading Businesses <span className="text-gradient">Choose Digital Hub</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            We combine high-level design aesthetics with hardcore full-stack software engineering and SEO precision.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '32px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ marginBottom: '20px' }}>{pt.icon}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{pt.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {pt.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
