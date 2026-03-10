import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import greeceImg from '../assets/greece.png';
import swissImg from '../assets/switzerland.png';
import maldivesImg from '../assets/maldives.png';
import japanImg from '../assets/japan.png';
import kenyaImg from '../assets/kenya.png';
import parisImg from '../assets/paris.png';

const countryPackages = [
  {
    id: 1,
    country: "Switzerland",
    image: swissImg,
    tag: "Mountain Paradise",
    places: [
      "Zurich Old Town", "Lake Lucerne", "Mt. Titlis", "Interlaken", "Jungfraujoch",
      "Lauterbrunnen", "Grindelwald Village", "Lake Brienz", "Bern Capital", "Zermatt Matterhorn"
    ]
  },
  {
    id: 2,
    country: "Greece",
    image: greeceImg,
    tag: "Mediterranean Soul",
    places: [
      "Athens Acropolis", "Santorini Oia", "Mykonos Town", "Delphi Ruins", "Meteora Monasteries",
      "Crete Beaches", "Rhodes Old Town", "Naxos Island", "Corfu Coast", "Zakynthos Blue Caves"
    ]
  },
  {
    id: 3,
    country: "Japan",
    image: japanImg,
    tag: "Oriental Heritage",
    places: [
      "Tokyo Shibuya", "Kyoto Temples", "Mount Fuji", "Osaka Castle", "Nara Deer Park",
      "Hakone Onsen", "Hiroshima Peace Park", "Miyajima Island", "Kanazawa Garden", "Sapporo Snow Park"
    ]
  },
  {
    id: 4,
    country: "Kenya",
    image: kenyaImg,
    tag: "Wildlife Kingdom",
    places: [
      "Maasai Mara Reserve", "Amboseli National Park", "Lake Nakuru", "Tsavo East", "Samburu Reserve",
      "Nairobi National Park", "Mount Kenya", "Mombasa Coast", "Diani Beach", "Hell's Gate Park"
    ]
  },
  {
    id: 5,
    country: "France",
    image: parisImg,
    tag: "Cultural Epicenter",
    places: [
      "Eiffel Tower", "Louvre Museum", "Versailles Palace", "Mont Saint-Michel", "French Riviera",
      "Loire Valley Castles", "Lyon Gastronomy", "Bordeaux Vineyards", "Provence Lavender Fields", "Strasbourg Old Town"
    ]
  }
];

const HolidaysPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  const filtered = activeTab === "All"
    ? countryPackages
    : countryPackages.filter(p => p.country === activeTab);

  return (
    <div className="page-wrapper">
      <header className="catalog-header header-with-bg">
        <img src={greeceImg} alt="Holidays Background" className="header-bg" />
        <div className="header-overlay"></div>

        <div className="container header-content">
          <span className="kicker reveal">Discover Your Next Chapter</span>
          <h1 className="reveal" style={{ transitionDelay: '0.2s' }}>The World <span className="text-highlight">Catalog</span></h1>
          <p className="reveal" style={{ transitionDelay: '0.3s' }}>Exploring over 50+ iconic locations across 5 major continents. Handpicked experiences for the elite traveler.</p>
        </div>
      </header>

      {/* 🗺️ Global Filter */}
      <nav className="catalog-tabs container">
        <button className={activeTab === "All" ? "tab active" : "tab"} onClick={() => setActiveTab("All")}>Entire World</button>
        {countryPackages.map(p => (
          <button
            key={p.id}
            className={activeTab === p.country ? "tab active" : "tab"}
            onClick={() => setActiveTab(p.country)}
          >
            {p.country}
          </button>
        ))}
      </nav>

      <section className="catalog-grid container">
        {filtered.map((pkg, idx) => (
          <div key={pkg.id} className="catalog-item-modern reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
            <div className="item-visuals">
              <img src={pkg.image} alt={pkg.country} />
              <div className="item-tag">{pkg.tag}</div>
              <div className="image-overlay"></div>
            </div>

            <div className="item-data">
              <div className="item-header">
                <h2>{pkg.country} <span>Experience</span></h2>
                <span className="count">10 Locations</span>
              </div>

              <div className="places-list">
                {pkg.places.map((place, i) => (
                  <div key={i} className="place-chip">{place}</div>
                ))}
              </div>

              <div className="item-footer">
                <Link to="/plan-my-trip" className="btn-catalog-primary">View More</Link>
                <Link to="/plan-my-trip" className="btn-catalog-outline">Inquiry</Link>
              </div>
            </div>
          </div>
        ))}
      </section>

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
        .kicker { color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; font-size: 0.85rem; margin-bottom: 2rem; display: block; }
        .catalog-header h1 { font-size: 5rem; color: white; margin-bottom: 2rem; letter-spacing: -2px; }
        .catalog-header p { font-size: 1.3rem; opacity: 0.8; max-width: 800px; margin: 0 auto; line-height: 1.7; }
        .text-highlight { color: var(--primary); font-family: serif; font-style: italic; font-weight: 400; }

        .catalog-tabs { 
            display: flex; gap: 1.5rem; justify-content: center; margin-top: -3.5rem; position: relative; z-index: 50; 
            padding-bottom: 5rem; overflow-x: auto; scrollbar-width: none;
        }
        .catalog-tabs::-webkit-scrollbar { display: none; }
        .tab {
            padding: 1.2rem 2.5rem; background: white; border: none; border-radius: 16px; 
            font-size: 1rem; font-weight: 800; color: var(--secondary); cursor: pointer;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08); transition: all 0.4s; white-space: nowrap;
        }
        .tab.active { background: var(--primary); color: white; transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,200,133,0.3); }

        .catalog-grid { padding: 5rem 0 10rem; display: flex; flex-direction: column; gap: 6rem; }
        .catalog-item-modern {
            display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; align-items: stretch;
            background: white; border-radius: 40px; overflow: hidden; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.04); border: 1px solid #f0f0f0;
            transition: 0.5s;
        }
        .catalog-item-modern:hover { transform: translateY(-10px); box-shadow: 0 40px 100px rgba(0,0,0,0.08); }
        
        .item-visuals { position: relative; min-height: 500px; }
        .item-visuals img { width: 100%; height: 100%; object-fit: cover; }
        .item-tag { 
            position: absolute; top: 2rem; left: 2rem; background: var(--primary); 
            color: white; padding: 0.5rem 1.2rem; border-radius: 10px; font-weight: 800; 
            font-size: 0.75rem; text-transform: uppercase; z-index: 10;
        }
        .image-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.4), transparent); }

        .item-data { padding: 5rem; display: flex; flex-direction: column; }
        .item-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; border-bottom: 1px solid #eee; padding-bottom: 2rem; }
        .item-header h2 { font-size: 2.5rem; color: var(--secondary); }
        .item-header h2 span { color: var(--primary); font-weight: 400; font-family: serif; font-style: italic; }
        .item-header .count { font-weight: 800; font-size: 0.9rem; text-transform: uppercase; color: var(--text-light); }

        .places-list { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 4rem; }
        .place-chip {
            background: #f8fbfd; color: var(--secondary); font-weight: 700; font-size: 0.9rem;
            padding: 0.8rem 1.4rem; border-radius: 12px; border: 1px solid #eef2f5;
            transition: 0.3s;
        }
        .place-chip:hover { border-color: var(--primary); color: var(--primary); background: white; }

        .item-footer { display: flex; gap: 2rem; margin-top: auto; }
        .btn-catalog-primary { 
            flex: 1.5; background: var(--secondary); color: white; padding: 1.2rem; 
            border-radius: 14px; font-weight: 800; text-align: center; font-size: 1rem;
            box-shadow: 0 10px 20px rgba(1, 61, 49, 0.1);
        }
        .btn-catalog-primary:hover { background: var(--primary); }
        .btn-catalog-outline { 
            flex: 1; border: 2px solid var(--secondary); color: var(--secondary); padding: 1.2rem; 
            border-radius: 14px; font-weight: 800; text-align: center; font-size: 1rem;
        }
        .btn-catalog-outline:hover { background: var(--secondary); color: white; }

        .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 1200px) { .catalog-item-modern { grid-template-columns: 1fr; gap: 0; } .item-visuals { height: 400px; } }
        @media (max-width: 768px) { .catalog-header h1 { font-size: 3rem; } .item-data { padding: 3rem; } .item-header h2 { font-size: 1.8rem; } }
      `}</style>
    </div>
  );
};

export default HolidaysPage;
