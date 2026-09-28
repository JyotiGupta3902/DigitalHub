import React, { useState, useEffect } from 'react';
import { Eye, Trophy } from 'lucide-react';

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  tags: string[];
  results?: string;
}

export const PortfolioSection: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => setGallery(data))
      .catch((err) => console.error(err));
  }, []);

  const filterTabs = ['All', 'Web Design', 'SEO Results', 'E-Commerce', 'SaaS Platform', 'Mobile App'];

  const filteredItems =
    activeFilter === 'All'
      ? gallery
      : gallery.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <Trophy size={14} color="var(--primary)" />
            <span>PORTFOLIO & GALLERY</span>
          </div>
          <h2 style={{ fontSize: '2.6rem', marginBottom: '16px' }}>
            Featured Work & <span className="text-gradient">Case Studies</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Explore our latest enterprise web applications, e-commerce builds, and high-impact SEO campaigns.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  border: activeFilter === tab ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: activeFilter === tab ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                  color: activeFilter === tab ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '28px' }}>
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="glass-panel shimmer-card"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => setActiveItem(item)}
            >
              {/* Image Preview Container */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.10)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                
                {/* Result Highlight Badge */}
                {item.results && (
                  <div
                    className="animate-pulse-glow"
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(6, 9, 19, 0.88)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid var(--border-glow)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    🚀 {item.results}
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', marginTop: '6px', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                    {item.description}
                  </p>
                </div>

                {/* Tech Tags & View Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {item.tags?.map((tag, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>View</span>
                    <Eye size={16} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for Item View */}
        {activeItem && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.82)',
              backdropFilter: 'blur(16px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setActiveItem(null)}
          >
            <div
              className="glass-panel"
              style={{
                maxWidth: '680px',
                width: '100%',
                background: 'var(--bg-main)',
                padding: '32px',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px', marginBottom: '24px' }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="pill-badge">{activeItem.category}</span>
                {activeItem.results && (
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{activeItem.results}</span>
                )}
              </div>

              <h3 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{activeItem.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                {activeItem.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {activeItem.tags?.map((t, idx) => (
                    <span key={idx} style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <button onClick={() => setActiveItem(null)} className="btn-secondary" style={{ padding: '8px 20px' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
