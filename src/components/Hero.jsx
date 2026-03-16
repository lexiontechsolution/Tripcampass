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

    const fetchTrending = async () => {
      try {
        const res = await fetch(`${API_BASE}/destinations`);
        const data = await res.json();
        if (data && data.length > 0) {
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
      <div className="hero-bg-wrapper">
        <img src={heroLux} alt="Luxury Destination" className="hero-bg-img" />
        <div className="hero-vignette"></div>
      </div>

      <div className="container hero-layout-container">
        <div className="hero-grid">
          {/* LEFT: Text Content */}
          <div className="hero-text-side">
            <span className="hero-kicker">COLLECT MOMENTS, NOT THINGS</span>
            <h1 className="hero-title">
              Crafting Your <br />
              <span className="serif-emphasize">Exquisite</span> Escape.
            </h1>
            <p className="hero-lead">
              Expertly curated journeys for the discerning traveler. From hidden gems to
              world-renowned luxury, we design the stories you'll tell for a lifetime.
            </p>

            <div className="search-dock-container">
              <form className="search-dock-form" onSubmit={handleSearch}>
                <div className="input-with-icon">
                  <span className="dock-icon">🌍</span>
                  <input
                    type="text"
                    placeholder="Where is your heart leading you?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="dock-submit">
                  <span>EXPLORE</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </form>
              <div className="search-trending">
                <span>Trending:</span>
                {popularSearches.map(tag => (
                  <button key={tag} onClick={() => setQuery(tag)} className="trending-link">{tag}</button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Categories */}
          <div className="hero-visual-side">
            <div className="category-stack">
              {categories.map((cat, idx) => (
                <Link key={idx} to={cat.path} className="glass-cat-card">
                  <div className="cat-icon-box">{cat.icon}</div>
                  <div className="cat-details">
                    <h4>{cat.title}</h4>
                    <p>View Packages</p>
                  </div>
                  <div className="cat-arrow">→</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: Horizontal Stats */}
        <div className="hero-bottom-stats">
          <div className="stat-box">
            <span className="stat-value">{stats.years}</span>
            <span className="stat-desc">YEARS OF EXPERTISE</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{stats.destinations}</span>
            <span className="stat-desc">CURATED DESTINATIONS</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">24/7</span>
            <span className="stat-desc">CONCIERGE SERVICE</span>
          </div>
        </div>
      </div>

      {/* MARQUEE: Hashtag Ticker */}
      <div className="film-marquee">
        <div className="marquee-track">
          {[...hashtags, ...hashtags].map((tag, i) => (
            <span key={i} className="marquee-item">{tag}</span>
          ))}
        </div>
      </div>

      <style>{`
                .hero-cinematic {
                    min-height: 100vh;
                    position: relative;
                    padding-top: 120px;
                    padding-bottom: 150px;
                    display: flex;
                    align-items: center;
                    background: #030a08;
                    color: white;
                    overflow: hidden;
                }

                .hero-bg-wrapper {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }
                .hero-bg-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: brightness(0.5);
                }
                .hero-vignette {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(3,10,8,0.7) 0%, rgba(3,10,8,0.3) 50%, rgba(3,10,8,0.9) 100%);
                }

                .hero-layout-container {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                }

                .hero-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 60px;
                    align-items: center;
                    margin-bottom: 80px;
                }

                .hero-kicker {
                    display: block;
                    color: #00c885;
                    font-weight: 900;
                    letter-spacing: 4px;
                    font-size: 0.85rem;
                    margin-bottom: 20px;
                }

                .hero-title {
                    font-size: clamp(2.8rem, 8vw, 5.5rem);
                    line-height: 1.1;
                    font-weight: 900;
                    margin-bottom: 30px;
                    color: #ffffff;
                    text-shadow: 0 10px 40px rgba(0,0,0,0.8);
                }
                .serif-emphasize {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-weight: 400;
                    color: #ffffff;
                }

                .hero-lead {
                    font-size: 1.1rem;
                    opacity: 0.9;
                    max-width: 550px;
                    line-height: 1.8;
                    margin-bottom: 50px;
                    color: #ffffff;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
                }

                /* Search Bar */
                .search-dock-container { max-width: 600px; }
                .search-dock-form {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 8px;
                    border-radius: 100px;
                    display: flex;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.5);
                    transition: 0.3s;
                }
                .search-dock-form:focus-within { border-color: #00c885; box-shadow: 0 25px 50px rgba(0, 200, 133, 0.2); }
                .input-with-icon { flex: 1; display: flex; align-items: center; padding-left: 20px; gap: 15px; }
                .dock-icon { font-size: 1.3rem; }
                .input-with-icon input {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: white;
                    width: 100%;
                    font-size: 1.05rem;
                }
                .input-with-icon input::placeholder { color: rgba(255,255,255,0.6); }

                .dock-submit {
                    background: #00c885;
                    color: white;
                    border: none;
                    border-radius: 100px;
                    padding: 12px 35px;
                    font-weight: 900;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .dock-submit svg { width: 20px; height: 20px; transition: 0.3s; }
                .dock-submit:hover { transform: scale(1.05); background: white; color: #00c885; }

                .search-trending {
                    margin-top: 15px;
                    display: flex;
                    gap: 15px;
                    padding-left: 20px;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.5);
                }
                .trending-link { background: none; border: none; color: white; opacity: 0.7; cursor: pointer; transition: 0.2s; }
                .trending-link:hover { opacity: 1; color: #00c885; text-decoration: underline; }

                /* Category Cards */
                .category-stack { display: flex; flex-direction: column; gap: 15px; }
                .glass-cat-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 20px 25px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    text-decoration: none;
                }
                .glass-cat-card:hover {
                    background: rgba(255, 255, 255, 0.12);
                    transform: translateX(-15px);
                    border-color: #00c885;
                    box-shadow: 20px 0 40px rgba(0,0,0,0.3);
                }
                .cat-icon-box { font-size: 2rem; }
                .cat-details h4 { margin: 0; font-size: 1.15rem; color: white; font-weight: 700; }
                .cat-details p { margin: 0; font-size: 0.75rem; color: #00c885; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
                .cat-arrow { margin-left: auto; font-size: 1.2rem; color: #00c885; opacity: 0; transform: translateX(-10px); transition: 0.3s; }
                .glass-cat-card:hover .cat-arrow { opacity: 1; transform: translateX(0); }

                /* Stats Row */
                .hero-bottom-stats {
                    display: flex;
                    gap: 80px;
                    padding: 50px 0;
                    border-top: 1px solid rgba(255,255,255,0.15);
                }
                .stat-box { display: flex; flex-direction: column; }
                .stat-value { font-size: 2.5rem; font-weight: 900; color: white; line-height: 1; }
                .stat-desc { font-size: 0.75rem; font-weight: 800; color: #00c885; letter-spacing: 2px; margin-top: 10px; }

                /* Marquee Ticker */
                .film-marquee {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    background: rgba(0,0,0,0.7);
                    backdrop-filter: blur(10px);
                    padding: 18px 0;
                    overflow: hidden;
                    z-index: 5;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                .marquee-track {
                    display: flex;
                    gap: 60px;
                    width: max-content;
                    animation: marqueeScroll 50s linear infinite;
                }
                .marquee-item { color: rgba(255,255,255,0.4); font-size: 0.8rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }

                @keyframes marqueeScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }

                /* RESPONSIVENESS */
                @media (max-width: 1100px) {
                    .hero-grid { grid-template-columns: 1fr; gap: 70px; text-align: center; }
                    .hero-lead { margin: 0 auto 50px; }
                    .search-dock-container { margin: 0 auto; }
                    .hero-bottom-stats { justify-content: center; gap: 50px; flex-wrap: wrap; }
                    .category-stack { flex-direction: row; flex-wrap: wrap; justify-content: center; }
                    .glass-cat-card { width: 280px; }
                }

                @media (max-width: 768px) {
                    .hero-title { font-size: 3rem; }
                    .hero-bottom-stats { gap: 30px; }
                    .stat-value { font-size: 2rem; }
                }

                @media (max-width: 600px) {
                    .hero-cinematic { padding-top: 140px; }
                    .hero-title { font-size: 2.5rem; }
                    .search-dock-form { 
                        flex-direction: column; 
                        border-radius: 30px; 
                        padding: 15px; 
                        background: rgba(255, 255, 255, 0.15);
                    }
                    .input-with-icon { padding: 10px 0 20px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 10px; width: 100%; }
                    .dock-submit { width: 100%; justify-content: center; padding: 15px; }
                    .search-trending { display: none; }
                    .glass-cat-card { width: 100%; transform: none !important; }
                    .hero-bottom-stats { border-top: none; padding-top: 0; }
                }
            `}</style>
    </section>
  );
};

export default Hero;
