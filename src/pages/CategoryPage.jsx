import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Destinations from '../components/Destinations';

const CategoryPage = () => {
    const { category } = useParams();
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_BASE = import.meta.env.VITE_API_BASE || '/api';

    const categoryTitles = {
        couple: "Couple & Honeymoon Packages",
        family: "Family & Friends Special",
        adventure: "Thrilling Adventure Expeditions",
        solo: "Solo Traveler Adventures",
        premium: "Premium Luxury Experiences"
    };

    const categorySubtitles = {
        couple: "Handpicked romantic getaways for you and your partner.",
        family: "Create unforgettable memories with your loved ones.",
        adventure: "Push your limits with our handpicked adventure tours.",
        solo: "Discover yourself while discovering the world.",
        premium: "Top-tier destinations for the discerning traveler."
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCategorizedDestinations();
    }, [category]);

    const fetchCategorizedDestinations = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/destinations`);
            const data = await res.json();
            // Filter by category
            const filtered = data.filter(dest => dest.category === category);
            setDestinations(filtered);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="category-page">
            <header className="category-header">
                <div className="container">
                    <span className="category-kicker">Explore Categories</span>
                    <h1>{categoryTitles[category] || "Special Packages"}</h1>
                    <p>{categorySubtitles[category] || "Find the perfect trip for your needs."}</p>
                </div>
            </header>

            <section className="category-content container">
                {loading ? (
                    <div className="loader-container"><div className="loader"></div></div>
                ) : destinations.length > 0 ? (
                    <div className="destinations-grid">
                        {destinations.map((dest, idx) => (
                            <div key={dest._id} className="dest-card visible">
                                <div className="image-wrapper">
                                    <img src={dest.image} alt={dest.name} />
                                    <div className="img-overlay"></div>
                                    <div className="card-top-badges">
                                        <span className="dest-tag-premium">{dest.tag}</span>
                                        <div className="rating-pill">★ {dest.rating}</div>
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
                                            <span className="duration-pill">{dest.duration}</span>
                                        </div>
                                        <p className="dest-intro-text" style={{ opacity: 0.8, maxHeight: 'none', margin: '1rem 0' }}>{dest.intro}</p>
                                        <div className="dest-actions" style={{ opacity: 1, transform: 'none' }}>
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
                        ))}
                    </div>
                ) : (
                    <div className="no-packages">
                        <h3>No packages found for this category.</h3>
                        <p>We are constantly adding new destinations. Please check back later!</p>
                        <Link to="/destinations" className="btn-primary">View All Destinations</Link>
                    </div>
                )}
            </section>

            <style>{`
                .category-page { min-height: 100vh; padding-bottom: 5rem; background: #fdfdfd; }
                .category-header { background: #013d31; color: white; padding: 8rem 0 6rem; text-align: center; }
                .category-kicker { color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; font-size: 0.85rem; margin-bottom: 1rem; display: block; }
                .category-header h1 { font-size: 3.5rem; margin-bottom: 1rem; }
                .category-header p { font-size: 1.2rem; opacity: 0.8; max-width: 600px; margin: 0 auto; }
                
                .category-content { margin-top: 4rem; }
                
                .no-packages { text-align: center; padding: 5rem 0; }
                .no-packages h3 { font-size: 2rem; margin-bottom: 1rem; color: var(--secondary); }
                .btn-primary { display: inline-block; background: var(--primary); color: white; padding: 1rem 2rem; border-radius: 12px; margin-top: 2rem; font-weight: 700; }
                
                .loader-container { display: flex; justify-content: center; padding: 5rem; }
                .loader { width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

                /* Reuse card styles if not global */
                .destinations-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 4rem; }
                .dest-card { position: relative; height: 600px; border-radius: 30px; overflow: hidden; }
                .image-wrapper { position: absolute; inset: 0; z-index: 1; }
                .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
                .img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(1, 15, 12, 0.8) 0%, transparent 60%); z-index: 2; }
                .card-top-badges { position: absolute; top: 2rem; left: 2rem; right: 2rem; display: flex; justify-content: space-between; align-items: center; z-index: 10; }
                .dest-tag-premium { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); color: white; padding: 8px 16px; border-radius: 50px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; border: 1px solid rgba(255, 255, 255, 0.2); }
                .rating-pill { background: var(--primary); color: white; padding: 6px 14px; border-radius: 50px; font-weight: 800; font-size: 0.8rem; }
                .dest-content-glass { position: absolute; bottom: 2rem; left: 2rem; right: 2rem; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 25px; padding: 2rem; z-index: 10; color: white; }
                .dest-top-meta { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem; }
                .price-tag { background: rgba(255, 255, 255, 0.1); padding: 4px 12px; border-radius: 8px; font-weight: 900; color: var(--primary); font-size: 0.9rem; border: 1px solid rgba(0, 200, 133, 0.3); }
                .loc-text { color: var(--primary); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
                .dest-content-glass h3 { font-size: 1.8rem; margin-bottom: 0.5rem; color: white; }
                .duration-pill { font-size: 0.85rem; border-left: 2px solid var(--primary); padding-left: 10px; }
                .dest-actions { margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; }
                .btn-explore-elite { font-weight: 800; font-size: 0.9rem; color: white; text-transform: uppercase; letter-spacing: 1.5px; position: relative; }
                .btn-line { position: absolute; bottom: -5px; left: 0; width: 30px; height: 2px; background: var(--primary); transition: width 0.4s; }
                .btn-explore-elite:hover .btn-line { width: 100%; }
                .btn-enquiry-circle { width: 45px; height: 45px; border-radius: 50%; background: white; color: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
                
                @media (max-width: 768px) {
                    .category-header h1 { font-size: 2.5rem; }
                    .destinations-grid { grid-template-columns: 1fr; }
                    .dest-card { height: 500px; }
                }
            `}</style>
        </div>
    );
};

export default CategoryPage;
