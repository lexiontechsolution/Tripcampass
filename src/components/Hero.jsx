import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Import images
import heroLux from '../assets/hero-luxury.png';

const Hero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [stats, setStats] = useState({ destinations: '500+', years: '15+', happy: '5K+' });
  const [popularSearches, setPopularSearches] = useState(["Maldives", "Switzerland", "Bali", "Paris", "Iceland"]);
  const API_BASE = import.meta.env.VITE_API_BASE || '/api';

  useEffect(() => {
    // Fetch dynamic stats
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/stats`);
        const data = await res.json();
        if (data) {
          setStats({
            destinations: `${data.destinations}+`,
            years: `${data.years}+`,
            happy: data.happyTravelers
          });
        }
      } catch (err) {
        console.error("Stats fetch error:", err);
      }
    };

    // Fetch trending destinations as tags
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${API_BASE}/destinations`);
        const data = await res.json();
        if (data && data.length > 0) {
          // Take names of top 5 destinations, but filter out duplicates if any
          const names = [...new Set(data.slice(0, 10).map(d => d.name.split(' ')[0]))].slice(0, 5);
          if (names.length > 0) setPopularSearches(names);
        }
      } catch (err) {
        console.error("Trending fetch error:", err);
      }
    };

    fetchStats();
    fetchTrending();
  }, []);

  const categories = [
    { title: "Romantic", icon: "❤️", path: "/category/couple" },
    { title: "Family", icon: "👪", path: "/category/family" },
    { title: "Adventure", icon: "🏔️", path: "/category/adventure" },
    { title: "Solo", icon: "🎒", path: "/category/solo" }
  ];

  const hashtags = ["#LuxuryTravel", "#NatureLovers", "#HoneymoonGoals", "#BudgetTrip", "#AdventureAwaits", "#SustainableTravel", "#Wanderlust", "#GlobeTrotter"];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/destinations?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="hero-cinematic">
      {/* Background with Cinematic Zoom */}
      <div className="hero-bg-wrapper">
        <img src={heroLux} alt="Luxury Destination" className="animate-zoom" />
        <div className="hero-vignette"></div>
      </div>

      <div className="container hero-layout">
        <div className="hero-text-side">
          <div className="reveal-stagger">
            <span className="hero-pre-title">COLLECT MOMENTS, NOT THINGS</span>
            <h1 className="hero-title">
              Crafting Your <br />
              <span className="serif-touch">Exquisite</span> Escape.
            </h1>
            <p className="hero-description">
              Expertly curated journeys for the discerning traveler. From hidden gems to
              world-renowned luxury, we design the stories you'll tell for a lifetime.
            </p>
          </div>

          <div className="search-dock-wrapper">
            <form className="search-dock" onSubmit={handleSearch}>
              <div className="input-group">
                <span className="dock-icon">🌍</span>
                <input
                  type="text"
                  placeholder="Where is your heart leading you?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="dock-btn">
                <span>EXPLORE</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>

            <div className="trending-tags">
              <span>Trending:</span>
              {popularSearches.map(tag => (
                <button key={tag} onClick={() => setQuery(tag)} className="tag-link">{tag}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-visual-side">
          <div className="category-vertical-stack">
            {categories.map((cat, idx) => (
              <Link key={idx} to={cat.path} className="glass-card-vertical">
                <div className="card-icon">{cat.icon}</div>
                <div className="card-info">
                  <h4>{cat.title}</h4>
                  <span>View Packages</span>
                </div>
                <div className="card-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-footer-stats">
        <div className="stat-item">
          <span className="stat-num">{stats.years}</span>
          <span className="stat-label">Years of Expertise</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{stats.destinations}</span>
          <span className="stat-label">Curated Destinations</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">24/7</span>
          <span className="stat-label">Concierge Service</span>
        </div>
      </div>

      {/* 🎞️ Film Strip Ticker */}
      <div className="film-strip-ticker">
        <div className="ticker-track">
          {[...hashtags, ...hashtags].map((tag, i) => (
            <span key={i} className="ticker-item">{tag}</span>
          ))}
        </div>
      </div>

      <style>{`
        .hero-cinematic {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          padding: 120px 0 150px;
          overflow: hidden;
          background: #050a09;
          color: white;
        }

        .hero-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hero-bg-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7) contrast(1.1);
        }
        .hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(5,10,9,0.95) 0%, rgba(5,10,9,0.4) 50%, rgba(5,10,9,0.9) 100%);
        }

        .hero-layout {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        .hero-pre-title {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          letter-spacing: 4px;
          font-size: 0.85rem;
          color: var(--primary);
          margin-bottom: 20px;
          display: block;
        }

        .hero-title {
          font-size: clamp(3.5rem, 8vw, 6rem);
          line-height: 1;
          margin-bottom: 30px;
          font-weight: 900;
        }

        .serif-touch {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          color: white;
          position: relative;
        }

        .hero-description {
          font-size: 1.2rem;
          max-width: 550px;
          opacity: 0.8;
          line-height: 1.7;
          margin-bottom: 50px;
        }

        /* Search Dock */
        .search-dock-wrapper {
          max-width: 650px;
        }

        .search-dock {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 10px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-dock:focus-within {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .input-group {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 15px;
          padding-left: 20px;
        }

        .dock-icon { font-size: 1.5rem; }

        .input-group input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 1.1rem;
          width: 100%;
          font-family: 'Manrope', sans-serif;
        }
        .input-group input::placeholder { color: rgba(255,255,255,0.5); }

        .dock-btn {
          background: var(--primary);
          color: white;
          padding: 14px 35px;
          border-radius: 100px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.3s;
        }
        .dock-btn svg { width: 20px; height: 20px; }
        .dock-btn:hover { background: white; color: var(--secondary); transform: scale(1.05); }

        .trending-tags {
          margin-top: 20px;
          padding-left: 20px;
          display: flex;
          gap: 15px;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
        }
        .tag-link {
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: 0.2s;
        }
        .tag-link:hover { color: var(--primary); text-decoration: underline; }

        /* Vertical Categories */
        .category-vertical-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .glass-card-vertical {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px 25px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: 0.4s;
          position: relative;
          overflow: hidden;
        }

        .glass-card-vertical::before {
          content: '';
          position: absolute;
          left: 0; top: 0; width: 4px; height: 100%;
          background: var(--primary);
          opacity: 0; transition: 0.3s;
        }

        .glass-card-vertical:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(-10px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 20px 0 40px rgba(0,0,0,0.3);
        }
        .glass-card-vertical:hover::before { opacity: 1; }

        .card-icon { font-size: 1.8rem; }
        .card-info h4 { margin: 0; font-size: 1.1rem; color: white; letter-spacing: 1px; }
        .card-info span { font-size: 0.75rem; opacity: 0.4; text-transform: uppercase; font-weight: 800; }
        .card-arrow { margin-left: auto; opacity: 0; transform: translateX(-10px); transition: 0.3s; }
        .glass-card-vertical:hover .card-arrow { opacity: 1; transform: translateX(0); }

        /* Footer Stats */
        .hero-footer-stats {
          position: absolute;
          bottom: 60px;
          left: 5%;
          display: flex;
          gap: 60px;
          z-index: 10;
        }
        .stat-item { display: flex; flex-direction: column; gap: 5px; }
        .stat-num { font-size: 1.8rem; font-weight: 900; color: white; line-height: 1; }
        .stat-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: var(--primary); opacity: 0.8; }

        /* Ticker */
        .film-strip-ticker {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 15px 0;
          z-index: 5;
          overflow: hidden;
        }

        .ticker-track {
          display: flex;
          gap: 50px;
          width: max-content;
          animation: slideTicker 30s linear infinite;
        }

        .ticker-item {
          font-weight: 800;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.3);
          white-space: nowrap;
        }

        @keyframes slideTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 1100px) {
          .hero-layout { grid-template-columns: 1fr; gap: 40px; text-align: center; }
          .hero-description { margin: 0 auto 40px; }
          .search-dock-wrapper { margin: 0 auto; }
          .hero-footer-stats { position: relative; bottom: 0; left: 0; justify-content: center; margin-top: 60px; flex-wrap: wrap; }
          .hero-vignette { background: rgba(5,10,9,0.8); }
          .category-vertical-stack { flex-direction: row; flex-wrap: wrap; justify-content: center; }
          .glass-card-vertical:hover { transform: translateY(-5px); }
          .film-strip-ticker { position: relative; margin-top: 40px; }
        }

        @media (max-width: 600px) {
          .hero-title { font-size: 3.2rem; }
          .search-dock { flex-direction: column; border-radius: 30px; padding: 20px; }
          .input-group { padding: 0; width: 100%; }
          .dock-btn { width: 100%; justify-content: center; }
          .trending-tags { flex-wrap: wrap; justify-content: center; padding: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
