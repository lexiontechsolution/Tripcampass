import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Static Fallbacks
import swissImg from '../assets/switzerland.png';
import maldivesImg from '../assets/maldives.png';

const fallbackDestinations = [
  {
    _id: 'f1',
    name: "Swiss Dream Tour",
    location: "Zurich & St. Moritz, Switzerland",
    image: swissImg,
    duration: "7 Days / 6 Nights",
    rating: "4.9",
    tag: "Family Special",
    intro: "Enjoy amazing Swiss landscapes with best hotels and Indian food options."
  },
  {
    _id: 'f2',
    name: "Maldives Luxury Stay",
    location: "Private Islands, Maldives",
    image: maldivesImg,
    duration: "5 Days / 4 Nights",
    rating: "4.8",
    tag: "Honeymoon Deal",
    intro: "Beautiful overwater villas and clear water beaches. Perfect for couples."
  }
];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE || '/api';
  const location = useLocation();

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterData();
  }, [destinations, location.search]);

  const fetchDestinations = async () => {
    try {
      const res = await fetch(`${API_BASE}/destinations`);
      const data = await res.json();
      if (data && data.length > 0) {
        setDestinations(data);
      } else {
        setDestinations(fallbackDestinations);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setDestinations(fallbackDestinations);
    }
  };

  const filterData = () => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('q')?.toLowerCase() || '';

    let filtered = [...destinations];

    if (searchQuery) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery) ||
        dest.location.toLowerCase().includes(searchQuery) ||
        dest.intro?.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredDestinations(filtered);
  };

  return (
    <section id="destinations" className="elite-destinations">
      <div className="container">
        <div className="curation-header reveal">
          <div className="v-line"></div>
          <span className="subtitle">Our Best Collections</span>
          <h2 className="section-title">Popular <span className="text-highlight">Destinations</span></h2>
          <p className="header-desc">Specially planned trips for those who want the best experience.</p>
        </div>

        <div className="destinations-grid">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest, idx) => (
              <div key={dest._id} className="dest-card reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="image-wrapper">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                  />
                  <div className="img-overlay"></div>

                  <div className="card-top-badges">
                    <span className="dest-tag-premium">{dest.tag}</span>
                    <div className="rating-pill">
                      <span className="star">★</span> {dest.rating}
                    </div>
                  </div>
                </div>

                <div className="dest-content-glass">
                  <div className="content-inner">
                    <div className="dest-top-meta">
                      <span className="loc-text">{dest.location}</span>
                      {dest.price && <span className="price-tag">{dest.price}</span>}
                    </div>
                    <h3>{dest.name}</h3>
                    <div className="dest-meta-row">
                      <span className="duration-pill">
                        {dest.duration}
                      </span>
                    </div>
                    <p className="dest-intro-text">{dest.intro}</p>

                    <div className="dest-actions">
                      <Link to={`/package/${dest._id}`} className="btn-explore-elite">
                        View More
                        <span className="btn-line"></span>
                      </Link>
                      <Link to="/plan-my-trip" className="btn-enquiry-circle">
                        <span className="icon">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
              <h3>No destinations found matching your search.</h3>
              <p>Try searching for another city or country!</p>
            </div>
          )}
        </div>

        <div className="footer-callout reveal">
          <Link to="/holidays" className="view-all-link">
            <span>Check All 50+ Best Packages</span>
            <div className="arrow-box">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .elite-destinations { background-color: #fff; padding: 12rem 0; position: relative; }
        .curation-header { text-align: center; margin-bottom: 8rem; display: flex; flex-direction: column; align-items: center; }
        .v-line { width: 2px; height: 40px; background: var(--primary); margin-bottom: 2rem; }
        .header-desc { max-width: 500px; font-size: 1.1rem; color: var(--text-light); margin-top: 1.5rem; opacity: 0.7; font-weight: 500; }
        .destinations-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 4rem; }
        .dest-card { position: relative; height: 650px; border-radius: 30px; overflow: hidden; transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); cursor: pointer; }
        .image-wrapper { position: absolute; inset: 0; z-index: 1; }
        .image-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(1, 15, 12, 0.8) 0%, transparent 60%); z-index: 2; }
        .card-top-badges { position: absolute; top: 2rem; left: 2rem; right: 2rem; display: flex; justify-content: space-between; align-items: center; z-index: 10; }
        .dest-tag-premium { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); color: white; padding: 8px 16px; border-radius: 50px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; border: 1px solid rgba(255, 255, 255, 0.2); }
        .rating-pill { background: var(--primary); color: white; padding: 6px 14px; border-radius: 50px; font-weight: 800; font-size: 0.8rem; box-shadow: 0 5px 15px rgba(0, 200, 133, 0.3); }
        .dest-content-glass { position: absolute; bottom: 2rem; left: 2rem; right: 2rem; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 25px; padding: 2.5rem; z-index: 10; color: white; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .dest-top-meta { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem; }
        .price-tag { background: rgba(255, 255, 255, 0.1); padding: 4px 12px; border-radius: 8px; font-weight: 900; color: var(--primary); font-size: 0.9rem; border: 1px solid rgba(0, 200, 133, 0.3); }
        .loc-text { color: var(--primary); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; display: block; }
        .dest-content-glass h3 { font-size: 2rem; margin-bottom: 1.2rem; color: white; font-weight: 900; letter-spacing: -0.5px; }
        .duration-pill { font-size: 0.85rem; font-weight: 600; opacity: 0.8; border-left: 2px solid var(--primary); padding-left: 10px; }
        .dest-intro-text { font-size: 1rem; line-height: 1.6; opacity: 0; max-height: 0; overflow: hidden; transition: all 0.6s ease; margin-bottom: 0; }
        .dest-actions { margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; opacity: 0.3; transform: translateY(10px); transition: all 0.5s ease; }
        .btn-explore-elite { font-weight: 800; font-size: 0.9rem; color: white; text-transform: uppercase; letter-spacing: 1.5px; position: relative; padding-bottom: 5px; }
        .btn-line { position: absolute; bottom: 0; left: 0; width: 30px; height: 2px; background: var(--primary); transition: width 0.4s; }
        .btn-explore-elite:hover .btn-line { width: 100%; }
        .btn-enquiry-circle { width: 45px; height: 45px; border-radius: 50%; background: white; color: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; transition: all 0.3s; }
        .btn-enquiry-circle:hover { background: var(--primary); color: white; transform: scale(1.1); }
        .dest-card:hover { transform: translateY(-10px); }
        .dest-card:hover .image-wrapper img { transform: scale(1.1); }
        .dest-card:hover .dest-content-glass { transform: translateY(0); background: rgba(255, 255, 255, 0.1); }
        .dest-card:hover .dest-intro-text { opacity: 0.8; max-height: 100px; margin-bottom: 0.5rem; }
        .dest-card:hover .dest-actions { opacity: 1; transform: translateY(0); }
        .footer-callout { margin-top: 7rem; text-align: center; }
        .view-all-link { display: inline-flex; align-items: center; gap: 2rem; color: var(--secondary); font-weight: 900; font-size: 1.2rem; transition: all 0.3s; }
        .view-all-link .arrow-box { width: 60px; height: 60px; border: 2px solid rgba(0,0,0,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .view-all-link:hover { color: var(--primary); }
        .view-all-link:hover .arrow-box { border-color: var(--primary); transform: translateX(10px) rotate(-45deg); background: var(--primary); color: white; }
        @media (max-width: 992px) { .destinations-grid { grid-template-columns: 1fr; } .dest-card { height: 500px; } .dest-content-glass { padding: 1.5rem; } }
      `}</style>
    </section>
  );
};

export default Destinations;
