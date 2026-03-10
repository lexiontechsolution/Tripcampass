import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images directly
import heroImg from '../assets/hero.png';
import swissImg from '../assets/switzerland.png';
import maldivesImg from '../assets/maldives.png';

const slides = [
  {
    image: heroImg,
    tag: "Best in India",
    title1: "World",
    title2: "Tours",
    desc: "India's most trusted travel agency. We plan amazing world tours according to your budget and choice."
  },
  {
    image: swissImg,
    tag: "Europe Special",
    title1: "Swiss",
    title2: "Dream",
    desc: "Customized Switzerland packages with best hotels and sightseeing. Experience the real Alps with us."
  },
  {
    image: maldivesImg,
    tag: "Island Fun",
    title1: "Maldives",
    title2: "Stays",
    desc: "Beautiful overwater villas and luxury beach resorts. Special Honeymoon and Family deals available."
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setActive(true);
      }, 1000);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/destinations?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="hero-v6">
      <div className={`panes-wrapper ${active ? 'active' : ''}`}>
        {/* 🎬 Image Panes */}
        <div className="img-pane p1">
          <img src={slides[current].image} alt="" />
        </div>
        <div className="img-pane p2">
          <img src={slides[current].image} alt="" />
        </div>
        <div className="img-pane p3">
          <img src={slides[current].image} alt="" />
        </div>

        {/* 🌫️ Overlays */}
        <div className="v6-overlay"></div>

        {/* ✍️ Text Content */}
        <div className="container v6-content">
          <div className="v6-text-box">
            <span className="v6-tag">{slides[current].tag}</span>
            <h1 className="v6-title">
              <span className="t1">{slides[current].title1}</span>
              <span className="t2">{slides[current].title2}</span>
            </h1>
            <p className="v6-desc">{slides[current].desc}</p>

            <form className="v6-search-hub" onSubmit={handleSearch}>
              <div className="s-input">
                <input
                  type="text"
                  placeholder="Destination, Theme, Budget..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <span className="s-icon">📍</span>
              </div>
              <button type="submit" className="v6-btn">Search Experiences</button>
            </form>
          </div>

          {/* 📊 Side Stats */}
          <div className="v6-side-stats">
            <div className="s-item">
              <strong>5K+</strong>
              <span>Journeys</span>
            </div>
            <div className="s-item">
              <strong>95%</strong>
              <span>Visa Success</span>
            </div>
          </div>
        </div>

        {/* 🕹️ Navigation */}
        <div className="v6-nav">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`v6-nav-btn ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            >
              <span className="n-bar"></span>
              <span className="n-num">0{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .hero-v6 {
          height: 100vh;
          width: 100%;
          background: #010a08;
          overflow: hidden;
          position: relative;
        }
        .panes-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
        }

        .img-pane {
            flex: 1;
            height: 100%;
            overflow: hidden;
            position: relative;
            transition: transform 1.2s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .img-pane img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100%;
            object-fit: cover;
            filter: grayscale(20%);
            transition: filter 1.2s ease;
        }

        /* Offset internal images to match panes */
        .p1 img { left: 0; }
        .p2 img { left: -33.33vw; }
        .p3 img { left: -66.66vw; }

        /* Animation States */
        .panes-wrapper:not(.active) .p1 { transform: translateY(-100%); }
        .panes-wrapper:not(.active) .p2 { transform: translateY(100%); }
        .panes-wrapper:not(.active) .p3 { transform: translateY(-100%); }
        .active .img-pane img { filter: grayscale(0%); }

        .v6-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(1, 15, 12, 0.8) 0%, rgba(1, 15, 12, 0.4) 100%);
            z-index: 10;
        }

        .v6-content {
            position: absolute;
            inset: 0;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .v6-text-box { max-width: 700px; padding-top: 5vh; }
        
        .v6-tag {
            background: var(--primary);
            color: white;
            padding: 6px 16px;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 2rem;
            display: inline-block;
            opacity: 0; transform: translateY(20px);
            transition: all 0.8s ease 0.6s;
        }
        .active .v6-tag { opacity: 1; transform: translateY(0); }

        .v6-title {
            color: white;
            font-size: clamp(4rem, 10vw, 8rem);
            font-weight: 950;
            line-height: 0.85;
            letter-spacing: -4px;
            margin-bottom: 2.5rem;
            display: flex;
            flex-direction: column;
        }
        .v6-title span { display: block; overflow: hidden; }
        .v6-title .t1 { transform: translateX(-50px); opacity: 0; transition: all 1s ease 0.8s; }
        .v6-title .t2 { color: var(--primary); transform: translateX(50px); opacity: 0; transition: all 1s ease 1s; }
        .active .v6-title .t1, .active .v6-title .t2 { transform: translateX(0); opacity: 1; }

        .v6-desc {
            color: rgba(255,255,255,0.7);
            font-size: 1.25rem;
            line-height: 1.7;
            max-width: 500px;
            margin-bottom: 4rem;
            opacity: 0; transform: translateY(20px);
            transition: all 0.8s ease 1.2s;
        }
        .active .v6-desc { opacity: 1; transform: translateY(0); }

        .v6-search-hub {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 600px;
            opacity: 0; transform: scale(0.9);
            transition: all 0.8s ease 1.4s;
        }
        .active .v6-search-hub { opacity: 1; transform: scale(1); }
        .s-input { flex: 1; display: flex; align-items: center; padding-left: 20px; gap: 15px; }
        .s-icon { font-size: 1.2rem; }
        .s-input input {
            background: transparent; border: none; outline: none; width: 100%; color: white;
            font-size: 1.1rem; font-weight: 600;
        }
        .v6-btn {
            background: var(--primary);
            color: white;
            padding: 1.2rem 2.5rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 1rem;
            transition: 0.3s;
        }
        .v6-btn:hover { background: white; color: var(--secondary); }

        .v6-side-stats {
            display: flex;
            flex-direction: column;
            gap: 4rem;
            text-align: right;
            opacity: 0; transform: translateX(30px);
            transition: all 0.8s ease 1.6s;
        }
        .active .v6-side-stats { opacity: 1; transform: translateX(0); }
        .s-item strong { display: block; font-size: 2.22rem; color: white; font-weight: 900; line-height: 1; margin-bottom: 5px; }
        .s-item span { color: var(--primary); font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }

        .v6-nav {
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 4rem;
            z-index: 100;
        }
        .v6-nav-btn {
            background: none; border: none; outline: none; display: flex; align-items: center; gap: 15px; cursor: pointer; color: white; opacity: 0.3; transition: 0.4s;
        }
        .n-bar { width: 30px; height: 1px; background: white; transition: 0.4s; }
        .n-num { font-size: 0.8rem; font-weight: 900; }
        .v6-nav-btn.active { opacity: 1; }
        .v6-nav-btn.active .n-bar { width: 60px; background: var(--primary); height: 2px; }

        @media (max-width: 992px) {
            .panes-wrapper { flex-direction: column; }
            .img-pane { height: 33.33vh; }
            .img-pane img { width: 100%; height: 100vh; }
            .p1 img { top: 0; left: 0; }
            .p2 img { top: -33.33vh; left: 0; }
            .p3 img { top: -66.66vh; left: 0; }
            .v6-content { flex-direction: column; align-items: center; text-align: center; }
            .v6-side-stats { display: none; }
            .v6-search-hub { flex-direction: column; width: 100%; border-radius: 30px; padding: 20px; }
            .v6-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
