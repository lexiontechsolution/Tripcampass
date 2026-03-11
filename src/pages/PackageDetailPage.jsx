import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PackageDetailPage = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_BASE = import.meta.env.VITE_API_BASE || '/api';

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPackageDetails();
    }, [id]);

    const fetchPackageDetails = async () => {
        try {
            const res = await fetch(`${API_BASE}/destinations/${id}`);
            if (res.ok) {
                const data = await res.json();
                setPkg(data);
            }
        } catch (err) {
            console.error("Error fetching package details:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;
    if (!pkg) return <div className="error-container"><h2>Package Not Found</h2><Link to="/destinations">Back to List</Link></div>;

    const displayImage = pkg.image;

    return (
        <div className="package-detail-page">
            <header className="detail-hero" style={{ backgroundImage: `url(${displayImage})` }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <div className="badge-wrapper">
                        <span className="premium-badge">{pkg.tag}</span>
                        <span className="rating-badge">★ {pkg.rating}</span>
                    </div>
                    <h1>{pkg.name}</h1>
                    <p className="detail-loc">📍 {pkg.location}</p>
                </div>
            </header>

            <section className="detail-body container">
                <div className="detail-grid">
                    <div className="main-info">
                        <div className="info-card reveal visible">
                            <h3>About the Experience</h3>
                            <p className="description-text">{pkg.intro}</p>

                            <div className="itinerary-preview">
                                <h4>Trip Highlights / Inclusions</h4>
                                <p>Experience the ultimate luxury journey with our handpicked stays and local experts.</p>
                                <ul className="highlight-list">
                                    {(pkg.inclusions && pkg.inclusions.length > 0) ? pkg.inclusions.map((item, idx) => (
                                        <li key={idx}>✅ {item}</li>
                                    )) : (
                                        <>
                                            <li>✨ Premium Accommodation & Breakfast</li>
                                            <li>🚗 Private Guided Transfers</li>
                                            <li>🗺️ Exclusive Sightseeing Tours</li>
                                            <li>🍱 Authentic Local Culinary Experiences</li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <div className="sticky-itinerary">
                                <h4>Duration: {pkg.duration}</h4>
                                <div className="day-plan">
                                    {(pkg.itinerary && pkg.itinerary.length > 0) ? pkg.itinerary.map((day, idx) => (
                                        <div key={idx} className="day-pill">{day}</div>
                                    )) : (
                                        <>
                                            <div className="day-pill">Day 1: Arrival & Welcome Dinner</div>
                                            <div className="day-pill">Day 2: Full Day City Landmarks</div>
                                            <div className="day-pill">Day 3: Scenic Countryside Exploration</div>
                                            <div className="day-pill">Day 4: Leisure & Local Market Shopping</div>
                                            <div className="day-pill">Day 5: Departure with Memories</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar">
                        <div className="booking-card glass">
                            <h3>Secure Your Spot</h3>
                            <p className="price-hint">Starting from <span>{pkg.price || '$1,299'}</span></p>
                            <div className="divider"></div>
                            <ul className="include-list">
                                <li>✅ Luxury Stay included</li>
                                <li>✅ Airport Pick & Drop</li>
                                <li>✅ Daily Breakfast included</li>
                                <li>❌ Visa Fees (Check separately)</li>
                            </ul>
                            <Link to="/plan-my-trip" className="btn-book-now">Request Full Itinerary</Link>
                            <p className="support-text">Our experts reply within 4 hours.</p>
                        </div>

                        <div className="expert-card">
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100" alt="Consultant" />
                            <div>
                                <strong>Need Help?</strong>
                                <p>Chat with our travel expert</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        .package-detail-page { background: #fdfdfd; min-height: 100vh; padding-bottom: 5rem; }
        .detail-hero { height: 75vh; background-size: cover; background-position: center; position: relative; display: flex; align-items: flex-end; padding-bottom: 6rem; color: white; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%); }
        .hero-content { position: relative; z-index: 10; }
        .badge-wrapper { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .premium-badge { background: var(--primary); color: white; font-weight: 800; font-size: 0.75rem; padding: 6px 16px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; }
        .rating-badge { background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); color: white; font-weight: 800; font-size: 0.8rem; padding: 6px 14px; border-radius: 50px; }
        .detail-hero h1 { font-size: 5rem; font-weight: 900; margin-bottom: 1rem; letter-spacing: -2px; }
        .detail-loc { font-size: 1.4rem; opacity: 0.9; font-weight: 600; }

        .detail-body { margin-top: -80px; position: relative; z-index: 20; }
        .detail-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 3rem; }
        
        .info-card { background: white; border-radius: 40px; padding: 5rem; box-shadow: 0 30px 60px rgba(0,0,0,0.04); border: 1px solid #f0f0f0; }
        .info-card h3 { font-size: 2.2rem; margin-bottom: 2rem; color: var(--secondary); letter-spacing: -0.5px; }
        .description-text { font-size: 1.25rem; line-height: 1.8; color: #555; margin-bottom: 4rem; }
        
        .itinerary-preview { border-top: 1px solid #eee; padding-top: 3rem; margin-bottom: 3rem; }
        .itinerary-preview h4 { font-size: 1.5rem; margin-bottom: 1rem; }
        .highlight-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; }
        .highlight-list li { font-weight: 700; color: #444; font-size: 1rem; }

        .day-plan { margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem; }
        .day-pill { background: #f8fbfd; padding: 1.2rem; border-radius: 16px; border: 1px solid #eef2f5; font-weight: 700; color: var(--secondary); transition: 0.3s; cursor: default; }
        .day-pill:hover { border-color: var(--primary); background: white; color: var(--primary); transform: translateX(10px); }

        .sidebar { position: sticky; top: 120px; height: fit-content; }
        .booking-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border: 1px solid white; border-radius: 35px; padding: 3rem; box-shadow: 0 20px 50px rgba(0,0,0,0.06); }
        .booking-card h3 { font-size: 1.8rem; margin-bottom: 1rem; color: var(--secondary); }
        .price-hint { font-size: 1rem; color: #666; margin-bottom: 2rem; }
        .price-hint span { font-size: 2rem; font-weight: 900; color: var(--secondary); }
        .divider { height: 1px; background: #eee; margin-bottom: 2rem; }
        .include-list { list-style: none; margin-bottom: 2.5rem; }
        .include-list li { margin-bottom: 1rem; font-weight: 700; color: #555; font-size: 0.95rem; }
        .btn-book-now { display: block; background: #013d31; color: white; padding: 1.5rem; border-radius: 18px; text-align: center; font-weight: 800; font-size: 1.1rem; transition: 0.4s; }
        .btn-book-now:hover { background: var(--primary); transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0, 200, 133, 0.3); }
        .support-text { font-size: 0.8rem; color: #999; text-align: center; margin-top: 1.5rem; }

        .expert-card { margin-top: 2rem; display: flex; gap: 1.5rem; align-items: center; background: white; padding: 1.5rem; border-radius: 24px; border: 1px solid #f0f0f0; }
        .expert-card img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; }
        .expert-card strong { font-size: 1.1rem; display: block; color: var(--secondary); }
        .expert-card p { font-size: 0.85rem; color: #888; margin: 0; }

        .loader-container { height: 100vh; display: flex; align-items: center; justify-content: center; }
        .loader { width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        @media (max-width: 992px) { .detail-grid { grid-template-columns: 1fr; } .detail-hero h1 { font-size: 3.5rem; } .info-card { padding: 3rem; } }
      `}</style>
        </div>
    );
};

export default PackageDetailPage;
