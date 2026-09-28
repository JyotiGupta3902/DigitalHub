import React, { useState, useEffect } from 'react';
import { TrendingUp, Layout, ShoppingBag, Code2, MapPin, Sparkles, Check, ArrowUpRight, Zap } from 'lucide-react';

interface ServiceItem {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  imageUrl?: string;
  icon: string;
  features: string[];
  startingPrice: string;
  popular?: boolean;
}

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={24} color="var(--primary)" />,
  Layout: <Layout size={24} color="var(--accent-cyan)" />,
  ShoppingBag: <ShoppingBag size={24} color="var(--accent-purple)" />,
  Code2: <Code2 size={24} color="var(--accent-rose)" />,
  MapPin: <MapPin size={24} color="#38bdf8" />,
  Sparkles: <Sparkles size={24} color="#f59e0b" />,
};

export const ServicesSection: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  const categories = ['All', 'SEO', 'Web Development', 'Digital Solutions', 'E-Commerce', 'Branding'];

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <Zap size={14} color="var(--primary)" />
            <span>WHAT WE DO</span>
          </div>
          <h2 style={{ fontSize: '2.6rem', marginBottom: '16px' }}>
            Comprehensive <span className="text-gradient">Digital Services</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            From organic search domination to enterprise Web Applications, we build high-impact solutions engineered for business expansion.
          </p>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: activeCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                  color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Service Banner Image */}
              {service.imageUrl && (
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(6, 9, 19, 0.8))',
                    }}
                  ></div>

                  {service.popular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--primary))',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#fff',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      POPULAR
                    </div>
                  )}

                  {/* Icon Badge Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '24px',
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--bg-card)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid var(--border-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {iconMap[service.icon] || <TrendingUp size={24} color="var(--primary)" />}
                  </div>
                </div>
              )}

              {/* Service Card Content */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {!service.imageUrl && (
                    <div style={{ marginBottom: '16px' }}>
                      {iconMap[service.icon] || <TrendingUp size={28} color="var(--primary)" />}
                    </div>
                  )}

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.6 }}>
                    {service.shortDescription}
                  </p>

                  {/* Key features bullet points */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                    {service.features?.slice(0, 4).map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                        <Check size={15} color="var(--accent-cyan)" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Starting from</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{service.startingPrice}</div>
                  </div>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <span>Select Service</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
