import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="f-logo">
            <span className="logo-icon">🧭</span>
            <div className="logo-text"><span>Trip</span>Compass</div>
          </Link>
          <p className="description">
            India's most trusted travel agency. We create customized,
            luxury experiences that make your world tour unforgettable.
          </p>
          <div className="social-pill-box">
            <a href="#" className="social-pill">FB</a>
            <a href="#" className="social-pill">IG</a>
            <a href="#" className="social-pill">TW</a>
            <a href="#" className="social-pill">LI</a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Destinations</h4>
          <Link to="/destinations">Switzerland</Link>
          <Link to="/destinations">Maldives</Link>
          <Link to="/destinations">France</Link>
          <Link to="/destinations">Japan</Link>
          <Link to="/holidays">View All</Link>
        </div>

        <div className="footer-links-col">
          <h4>Company</h4>
          <Link to="/about">Our Story</Link>
          <Link to="/about">Why Choose Us</Link>
          <Link to="/plan-my-trip">Terms of Service</Link>
          <Link to="/plan-my-trip">Privacy Policy</Link>
        </div>

        <div className="footer-links-col">
          <h4>Expert Support</h4>
          <Link to="/plan-my-trip">Help & Contact</Link>
          <Link to="/plan-my-trip">Inquiry Form</Link>
          <Link to="/about">Visa Assistance</Link>
          <Link to="/about">Travel Insurance</Link>
        </div>
      </div>

      <div className="footer-meta container">
        <div className="meta-left">
          <p>&copy; 2026 TripCompass India. Best packages for everyone.</p>
        </div>
        <div className="meta-right">
          <div className="trust-badge">
            <span className="icon">⭐</span>
            <span>4.9/5 Google Satisfaction</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #050a0a;
          color: white;
          padding: 8rem 0 4rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 6rem;
          margin-bottom: 6rem;
        }
        .f-logo {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 2rem;
        }
        .f-logo .logo-icon { font-size: 2.22rem; }
        .f-logo .logo-text { font-size: 1.8rem; font-weight: 900; color: white; letter-spacing: -1px; }
        .f-logo .logo-text span { color: var(--primary); }
        
        .description {
          opacity: 0.6;
          line-height: 1.8;
          max-width: 320px;
          font-size: 1rem;
          margin-bottom: 2.5rem;
        }
        
        .social-pill-box {
          display: flex;
          gap: 1rem;
        }
        .social-pill {
          width: 45px;
          height: 45px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 800;
          transition: all 0.3s;
        }
        .social-pill:hover {
          background: var(--primary);
          border-color: var(--primary);
          transform: translateY(-5px);
        }

        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .footer-links-col h4 {
          color: white;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .footer-links-col a {
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
          font-weight: 600;
          transition: color 0.3s;
        }
        .footer-links-col a:hover {
          color: var(--primary);
        }

        .footer-meta {
          padding-top: 3rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .meta-left p {
          font-size: 0.9rem;
          opacity: 0.4;
          font-weight: 600;
        }
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(255,255,255,0.03);
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
        }
        
        @media (max-width: 992px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
          .footer-meta {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }
        }
        @media (max-width: 576px) {
          .footer-content { grid-template-columns: 1fr; gap: 4rem; }
          .footer { padding: 5rem 0 3rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
