import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { QuoteCalculator } from './components/QuoteCalculator';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './pages/AdminDashboard';
import { MessageCircle } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'main' | 'admin'>(() => {
    return window.location.pathname === '/admin' ? 'admin' : 'main';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('main');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: 'main' | 'admin') => {
    setCurrentView(view);
    const path = view === 'admin' ? '/admin' : '/';
    window.history.pushState({}, '', path);
  };

  const [selectedService, setSelectedService] = useState<string | undefined>();

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuote = () => {
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Dynamic Animated Ambient Mesh */}
      <div className="bg-mesh"></div>

      {/* Navigation Bar */}
      <Navbar
        onOpenAdmin={() => navigateTo('admin')}
        onOpenQuote={handleOpenQuote}
      />

      {/* Main Page Sections */}
      <main>
        <Hero onOpenQuote={handleOpenQuote} />
        <ServicesSection onSelectService={handleSelectService} />
        <QuoteCalculator initialService={selectedService} />
        <PortfolioSection />
        <WhyUsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Widget Button at Bottom Left */}
      <a
        href="https://wa.me/919455348347?text=Hello%20Digital%20Hub,%20I%20want%20to%20discuss%20a%20project!"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          background: '#25D366',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '0.88rem',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          transition: 'transform 0.2s',
        }}
        title="Chat on WhatsApp (+91 9455348347)"
      >
        <MessageCircle size={20} color="#fff" />
        <span>Chat on WhatsApp</span>
      </a>

      {/* Floating Admin Button at Bottom Right */}
      <button
        onClick={() => navigateTo('admin')}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))',
          color: '#fff',
          padding: '12px 22px',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '0.88rem',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.2s',
        }}
      >
        <span>🛡️ Full Admin Portal</span>
      </button>
    </div>
  );
}

export default App;
