import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Destinations from '../components/Destinations';
import WhyChooseUs from '../components/WhyChooseUs';
import WhatsAppButton from '../components/WhatsAppButton';
import { Link } from 'react-router-dom';
import swissImg from '../assets/switzerland.png';
import maldivesImg from '../assets/maldives.png';

const Home = () => {
    const [stats, setStats] = React.useState({ destinations: '500+', happy: '5K+', success: '95%' });
    const API_BASE = import.meta.env.VITE_API_BASE || '/api';

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch stats
        fetch(`${API_BASE}/stats`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setStats({
                        destinations: `${data.destinations}+`,
                        happy: data.happyTravelers,
                        success: '98%' // Keeping success rate static or from data if available
                    });
                }
            })
            .catch(err => console.error("Home stats error:", err));

        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-page">
            <Hero />


            {/* �🟢 Experience Section */}
            <section className="experience-showcase">
                <div className="container grid-2">
                    <div className="visual-side reveal">
                        <div className="image-stack">
                            <div className="main-img-box">
                                <img src={swissImg} alt="Travel" />
                            </div>
                            <div className="sub-img-box">
                                <img src={maldivesImg} alt="Travel" />
                            </div>
                            <div className="floating-badge">
                                <span className="number">7+</span>
                                <span className="label">Years of<br />Expertise</span>
                            </div>
                        </div>
                    </div>

                    <div className="content-side reveal" style={{ transitionDelay: '0.2s' }}>
                        <span className="kicker">India's Best Travel Experts</span>
                        <h2>We Plan <span className="text-highlight">Dream</span> Vacations for You</h2>
                        <p className="lead">
                            At TripCompass, we don't just book tickets; we make your dream trip come true.
                            Every package is planned specially based on your taste and budget.
                        </p>

                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feat-dot"></div>
                                <div className="feat-text">
                                    <h4>Customized Planning</h4>
                                    <p>Tell us your budget and requirements, we will plan the best trip.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feat-dot"></div>
                                <div className="feat-text">
                                    <h4>24/7 Helpline</h4>
                                    <p>Get full support from our experts during your travel anytime.</p>
                                </div>
                            </div>
                        </div>

                        <Link to="/about" className="cta-link">Discover Our Edge <span className="arrow">→</span></Link>
                    </div>
                </div>
            </section>


            {/* 🔵 Featured Curations */}
            <Destinations />

            {/* 🟡 The Trust Strip */}
            <section className="brand-trust-strip">
                <div className="container">
                    <div className="trust-grid">
                        <div className="trust-item reveal">
                            <h3>{stats.happy}</h3>
                            <p>Happy Travelers served</p>
                        </div>
                        <div className="trust-item reveal" style={{ transitionDelay: '0.1s' }}>
                            <h3>{stats.destinations}</h3>
                            <p>Best Hotel Partners</p>
                        </div>
                        <div className="trust-item reveal" style={{ transitionDelay: '0.2s' }}>
                            <h3>{stats.success}</h3>
                            <p>Visa Success Record</p>
                        </div>
                        <div className="trust-item reveal" style={{ transitionDelay: '0.3s' }}>
                            <h3>4.9/5</h3>
                            <p>Customer Reviews</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔴 Why TripCompass */}
            <WhyChooseUs />

            {/* 🟣 Inquiry CTA Section */}
            <section className="inquiry-cta">
                <div className="container">
                    <div className="cta-box reveal">
                        <div className="cta-content">
                            <h2>Thinking about your <span className="text-highlight">dream</span> trip?</h2>
                            <p>Let's plan it today. It takes less than 2 minutes to get best quotes.</p>
                        </div>
                        <Link to="/plan-my-trip" className="btn-primary-lg">Inquire Now</Link>
                    </div>
                </div>
            </section>

            <WhatsAppButton />

            <style>{`
                .home-page { overflow-x: hidden; }


                /* Experience Showcase */
                .experience-showcase { padding: 10rem 0; background: #fff; }
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
                
                .image-stack { position: relative; }
                .main-img-box { width: 85%; height: 500px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.1); }
                .main-img-box img { width: 100%; height: 100%; object-fit: cover; }
                .sub-img-box { 
                    position: absolute; bottom: -40px; right: 0; width: 50%; height: 250px; 
                    border-radius: var(--radius-md); overflow: hidden; border: 8px solid white; 
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
                }
                .sub-img-box img { width: 100%; height: 100%; object-fit: cover; }
                .floating-badge {
                    position: absolute; top: 40px; right: -20px; background: var(--secondary); color: white;
                    padding: 2rem; border-radius: 24px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                }
                .floating-badge .number { display: block; font-size: 3.5rem; font-weight: 900; line-height: 1; color: var(--primary); }
                .floating-badge .label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; opacity: 0.8; }

                .kicker { color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 3px; font-size: 0.85rem; margin-bottom: 1.5rem; display: block; }
                .content-side h2 { font-size: 4rem; margin-bottom: 2rem; line-height: 1.1; color: var(--secondary); }
                .lead { font-size: 1.25rem; color: var(--text-light); line-height: 1.7; margin-bottom: 3rem; }
                
                .feature-list { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 4rem; }
                .feature-item { display: flex; gap: 1.5rem; align-items: flex-start; }
                .feat-dot { min-width: 12px; height: 12px; border-radius: 50%; background: var(--primary); margin-top: 8px; box-shadow: 0 0 15px rgba(0,200,133,0.5); }
                .feat-text h4 { font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--secondary); }
                .feat-text p { font-size: 1rem; color: var(--text-light); opacity: 0.8; }
                
                .cta-link { font-weight: 800; font-size: 1.1rem; color: var(--secondary); display: flex; align-items: center; gap: 10px; }
                .cta-link:hover { color: var(--primary); }
                .cta-link:hover .arrow { transform: translateX(8px); }
                .arrow { transition: transform 0.3s; }

                /* Trust Strip */
                .brand-trust-strip { background: var(--secondary); padding: 5rem 0; color: white; border-top: 1px solid rgba(255,255,255,0.05); }
                .trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; gap: 2rem; }
                .trust-item h3 { font-size: 3.5rem; color: var(--primary); margin-bottom: 0.5rem; }
                .trust-item p { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; opacity: 0.7; }

                /* Inquiry CTA */
                .inquiry-cta { padding: 10rem 0; background: #fdfdfd; }
                .cta-box { 
                    background: linear-gradient(135deg, var(--secondary) 0%, #012a22 100%); 
                    padding: 5rem; border-radius: var(--radius-lg); display: flex; 
                    justify-content: space-between; align-items: center; color: white;
                    position: relative; overflow: hidden;
                }
                .cta-box::after {
                    content: ''; position: absolute; top: -50%; right: -10%; width: 400px; height: 400px;
                    background: var(--primary); border-radius: 50%; opacity: 0.1; filter: blur(80px);
                }
                .cta-content h2 { color: white; font-size: 3rem; margin-bottom: 1rem; }
                .cta-content p { font-size: 1.2rem; opacity: 0.8; }
                .btn-primary-lg { 
                    background: var(--primary); color: white; padding: 1.5rem 3rem; 
                    border-radius: 16px; font-weight: 800; font-size: 1.2rem; 
                    box-shadow: 0 20px 40px rgba(0,200,133,0.3);
                }
                .btn-primary-lg:hover { transform: translateY(-5px); box-shadow: 0 30px 60px rgba(0,200,133,0.4); }

                .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1); }
                .reveal.visible { opacity: 1; transform: translateY(0); }

                @media (max-width: 992px) {
                    .grid-2 { grid-template-columns: 1fr; gap: 4rem; overflow: visible; }
                    .main-img-box { width: 100%; height: 400px; }
                    .floating-badge { top: -20px; right: 0; padding: 1.5rem; }
                    .trust-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
                    .cta-box { flex-direction: column; text-align: center; gap: 3rem; padding: 4rem 2rem; }
                }
            `}</style>
        </div>
    );
};

export default Home;
