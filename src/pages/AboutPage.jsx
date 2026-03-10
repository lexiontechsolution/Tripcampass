import React, { useEffect } from 'react';
import swissImg from '../assets/switzerland.png';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      {/* 🏔️ About Hero */}
      <header className="about-hero header-with-bg">
        <img src={swissImg} alt="About Background" className="header-bg" />
        <div className="header-overlay"></div>

        <div className="container header-content">
          <span className="pill-outline reveal">Since 2018</span>
          <h1 className="reveal" style={{ transitionDelay: '0.2s' }}>
            The Story of <span className="text-highlight">TripCompass</span>
          </h1>
          <p className="reveal" style={{ transitionDelay: '0.3s' }}>
            We are more than travel planners. We are architects of memories,
            crafting journeys that resonate with the soul.
          </p>
        </div>
      </header>

      {/* 🏛️ Mission & Vision - Split Layout */}
      <section className="manifesto container">
        <div className="manifesto-grid">
          <div className="manifesto-img reveal">
            <img src={swissImg} alt="Swiss Landscape" className="round-img" />
            <div className="since-badge">Est. 2018</div>
          </div>
          <div className="manifesto-content">
            <div className="m-card reveal" style={{ transitionDelay: '0.2s' }}>
              <span className="icon">🎯</span>
              <h3>Our Mission</h3>
              <p>To redefine luxury travel by focusing on personalization, authenticity, and seamless execution. We believe every traveler is unique, and their journey should reflect that individuality.</p>
            </div>
            <div className="m-card reveal" style={{ transitionDelay: '0.4s' }}>
              <span className="icon">👁️</span>
              <h3>Our Vision</h3>
              <p>To become India's premier boutique travel agency, known for unlocking the world's most exclusive destinations through deep local expertise and unmatched customer care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 The TripCompass Stats */}
      <section className="stats-strip reveal">
        <div className="container grid-4">
          <div className="stat-unit">
            <h4>7+</h4>
            <span>Years Experience</span>
          </div>
          <div className="stat-unit">
            <h4>5,000+</h4>
            <span>Curated Itineraries</span>
          </div>
          <div className="stat-unit">
            <h4>95%</h4>
            <span>Visa Success Rate</span>
          </div>
          <div className="stat-unit">
            <h4>24/7</h4>
            <span>Real-time Support</span>
          </div>
        </div>
      </section>

      {/* 🛠️ Services Offered - High End Grid */}
      <section className="services-showcase container">
        <div className="section-header reveal">
          <h2>Our <span className="text-highlight">Expertise</span></h2>
          <p>Comprehensive solutions for every aspect of your voyage.</p>
        </div>

        <div className="services-grid">
          {[
            { icon: "✈️", title: "Custom Itineraries", desc: "Handcrafted day-by-day plans tailored to your specific interests and pace." },
            { icon: "🏩", title: "Luxury Stays", desc: "Exclusive partnerships with 5-star hotels and hidden boutique villas worldwide." },
            { icon: "🛡️", title: "Visa Assistance", desc: "Professional management of your visa application with industry-leading success rates." },
            { icon: "🚐", title: "Global Transfers", desc: "Seamless door-to-door transportation in high-end private vehicles." },
            { icon: "🎒", title: "Guided Tours", desc: "Access to elite local guides who reveal the authentic heart of every destination." },
            { icon: "🩺", title: "Travel Insurance", desc: "Comprehensive protection plans for total peace of mind on every continent." }
          ].map((s, i) => (
            <div key={i} className="service-card-premium reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="s-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
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
                .pill-outline {
                    border: 1px solid rgba(255,255,255,0.3);
                    padding: 0.5rem 1.5rem;
                    border-radius: 50px;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 2px;
                    font-weight: 700;
                    margin-bottom: 2rem;
                    display: inline-block;
                }
                .about-hero h1 { font-size: 4.5rem; color: white; margin-bottom: 2rem; letter-spacing: -2px; }
                .about-hero p { font-size: 1.4rem; opacity: 0.9; max-width: 700px; margin: 0 auto; line-height: 1.6; }
                .text-highlight { color: var(--primary); font-family: serif; font-style: italic; font-weight: 400; }
                
                .manifesto { padding: 10rem 0; }
                .manifesto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8rem; align-items: center; }
                .manifesto-img { position: relative; }
                .round-img { width: 100%; border-radius: 40px; box-shadow: 0 40px 80px rgba(0,0,0,0.1); }
                .since-badge {
                    position: absolute; bottom: -30px; right: -30px; background: var(--primary); color: white;
                    padding: 2.5rem; border-radius: 50%; font-weight: 900; font-size: 1.2rem;
                    display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1;
                    box-shadow: 0 20px 40px rgba(0,200,133,0.3);
                }
                .m-card { padding: 3rem; background: #fff; border-radius: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); margin-bottom: 2rem; border: 1px solid #f0f0f0; }
                .m-card .icon { font-size: 2.5rem; display: block; margin-bottom: 1.5rem; }
                .m-card h3 { font-size: 1.8rem; margin-bottom: 1rem; color: var(--secondary); }
                .m-card p { line-height: 1.8; color: var(--text-light); }

                .stats-strip { background: #fdfdfd; padding: 6rem 0; border-y: 1px solid #f0f0f0; }
                .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3rem; text-align: center; }
                .stat-unit h4 { font-size: 3.5rem; color: var(--primary); margin-bottom: 0.5rem; }
                .stat-unit span { font-weight: 700; color: var(--secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; }

                .services-showcase { padding: 10rem 0; }
                .section-header { text-align: center; margin-bottom: 6rem; }
                .section-header h2 { font-size: 3.5rem; margin-bottom: 1rem; }
                .section-header p { font-size: 1.2rem; color: var(--text-light); }
                .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
                .service-card-premium {
                    padding: 3.5rem 2.5rem; background: white; border-radius: var(--radius-lg); 
                    border: 1px solid #f0f0f0; transition: all 0.4s;
                }
                .service-card-premium:hover { 
                    transform: translateY(-10px); 
                    box-shadow: 0 40px 80px rgba(0,0,0,0.08); 
                    border-color: var(--primary);
                }
                .service-card-premium .s-icon { 
                    width: 70px; height: 70px; background: rgba(0,200,133,0.08); 
                    display: flex; align-items: center; justify-content: center; 
                    font-size: 2rem; border-radius: 20px; margin-bottom: 2rem;
                }
                .service-card-premium h4 { font-size: 1.4rem; margin-bottom: 1rem; color: var(--secondary); }
                .service-card-premium p { color: var(--text-light); line-height: 1.7; opacity: 0.8; }

                .reveal { opacity: 0; transform: translateY(30px); transition: all 1s ease-out; }
                .reveal.visible { opacity: 1; transform: translateY(0); }

                @media (max-width: 992px) {
                    .manifesto-grid { grid-template-columns: 1fr; gap: 5rem; }
                    .services-grid { grid-template-columns: 1fr 1fr; }
                    .about-hero h1 { font-size: 3rem; }
                    .grid-4 { grid-template-columns: 1fr 1fr; }
                    .header-with-bg { height: 50vh; }
                }
                @media (max-width: 600px) {
                    .services-grid { grid-template-columns: 1fr; }
                    .grid-4 { grid-template-columns: 1fr; }
                }
            `}</style>
    </div>
  );
};

export default AboutPage;
