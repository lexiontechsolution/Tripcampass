import React, { useEffect } from 'react';
import Destinations from '../components/Destinations';
import parisImg from '../assets/paris.png';

const DestinationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-container">
      <header className="page-header header-with-bg">
        <img src={parisImg} alt="Destinations Background" className="header-bg" />
        <div className="header-overlay"></div>

        <div className="container header-content">
          <span className="kicker reveal">Infinite Choices</span>
          <h1 className="reveal" style={{ transitionDelay: '0.2s' }}>Explore Our <span className="text-highlight">Destinations</span></h1>
          <p className="reveal" style={{ transitionDelay: '0.3s' }}>From the snowy peaks of Europe to the tropical beaches of Asia.</p>
        </div>
      </header>

      <div className="filter-bar container reveal" style={{ transitionDelay: '0.4s' }}>
        <div className="filter-groups">
          <select><option>Region</option><option>Europe</option><option>Asia</option></select>
          <select><option>Theme</option><option>Adventure</option><option>Honeymoon</option></select>
          <select><option>Budget</option><option>Value</option><option>Luxury</option></select>
        </div>
      </div>

      <Destinations />

      <style>{`
        .header-with-bg {
          position: relative;
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-align: center;
          color: white;
        }
        .header-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -2;
        }
        .header-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(1, 61, 49, 0.8), rgba(0,0,0,0.4));
          z-index: -1;
        }
        .header-content {
          position: relative;
          z-index: 10;
        }
        .kicker {
          color: var(--primary);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          display: block;
        }
        .page-header h1 {
          color: white;
          font-size: 4.5rem;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }
        .page-header p {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }
        .text-highlight {
          color: var(--primary);
          font-family: serif;
          font-style: italic;
          font-weight: 400;
        }

        .filter-bar {
          margin: -3.5rem auto 5rem;
          background: white;
          padding: 2.5rem;
          border-radius: 24px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.1);
          position: relative;
          z-index: 20;
          border: 1px solid #f0f0f0;
        }
        .filter-groups {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }
        .filter-groups select {
          padding: 1.2rem 2rem;
          border: 1px solid #eee;
          border-radius: 12px;
          font-family: inherit;
          min-width: 200px;
          font-weight: 700;
          background: #fdfdfd;
        }

        .reveal { opacity: 0; transform: translateY(30px); transition: 1s ease-out; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 768px) {
          .page-header h1 { font-size: 3rem; }
          .filter-groups { flex-direction: column; gap: 1rem; }
          .header-with-bg { height: 50vh; }
        }
      `}</style>
    </div>
  );
};

export default DestinationsPage;
