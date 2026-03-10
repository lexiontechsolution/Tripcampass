import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: "Destinations", path: "/destinations" },
    { title: "Holidays", path: "/holidays" },
    { title: "Why Us", path: "/about" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`nav-wrapper ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <div className="brand-icon">🧭</div>
          <div className="brand-name">
            <span>Trip</span>Compass
          </div>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.title}
              <span className="dot"></span>
            </Link>
          ))}
          <Link to="/plan-my-trip" className="btn-nav-primary" onClick={closeMenu}>
            Plan My Trip
          </Link>
        </div>

        <button
          className={`hamburger ${isOpen ? 'is-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>

      <style>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2000;
          height: 100px;
          display: flex;
          align-items: center;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          background: transparent;
        }
        .nav-wrapper.scrolled {
          height: 85px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
          border-bottom: 1px solid rgba(0,0,0,0.03);
        }
        .nav-wrapper.menu-open {
          background: white;
        }

        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1001;
        }
        .brand-icon {
          font-size: 2.4rem;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }
        .brand-name {
          font-size: 1.6rem;
          font-weight: 900;
          color: white;
          letter-spacing: -0.5px;
          transition: color 0.4s;
        }
        .brand-name span { color: var(--primary); }
        .scrolled .brand-name, .menu-open .brand-name { color: var(--secondary); }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 3.5rem;
        }
        .nav-item {
          position: relative;
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.3s;
          padding: 10px 0;
        }
        .scrolled .nav-item, .menu-open .nav-item { color: var(--secondary); }
        
        .nav-item .dot {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          width: 5px;
          height: 5px;
          background: var(--primary);
          border-radius: 50%;
          transition: transform 0.3s;
        }
        .nav-item:hover .dot, .nav-item.active .dot {
          transform: translateX(-50%) scale(1);
        }
        .nav-item:hover, .nav-item.active {
          color: var(--primary) !important;
        }

        .btn-nav-primary {
          background: var(--primary);
          color: white !important;
          padding: 1rem 2rem;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.95rem;
          box-shadow: 0 10px 20px rgba(0, 200, 133, 0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .btn-nav-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 200, 133, 0.3);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 7px;
          background: none;
          z-index: 1001;
          cursor: pointer;
        }
        .hamburger .line {
          width: 30px;
          height: 2px;
          background: white;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .scrolled .hamburger .line, .menu-open .hamburger .line { background: var(--secondary); }
        
        .hamburger.is-active .line:nth-child(1) { transform: translateY(9px) rotate(45deg); width: 28px; }
        .hamburger.is-active .line:nth-child(2) { opacity: 0; }
        .hamburger.is-active .line:nth-child(3) { transform: translateY(-9px) rotate(-45deg); width: 28px; }

        @media (max-width: 992px) {
          .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 100%;
            max-width: 420px;
            background: white;
            flex-direction: column;
            justify-content: center;
            gap: 2.5rem;
            box-shadow: -40px 0 100px rgba(0,0,0,0.15);
            transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
          .nav-menu.active { right: 0; }
          .nav-item { color: var(--secondary) !important; font-size: 1.8rem; }
          .hamburger { display: flex; }
          .btn-nav-primary { font-size: 1.4rem; padding: 1.5rem 3.5rem; margin-top: 1rem; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
