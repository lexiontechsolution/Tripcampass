import React from 'react';

const stats = [
  {
    icon: "✨",
    title: "100% Customized",
    desc: "Plan your trip exactly how you want. We will adjust everything according to your choice.",
    color: "#00c885"
  },
  {
    icon: "⚡",
    title: "Fast Booking",
    desc: "No waiting. Get your flight tickets and hotel vouchers confirmed instantly.",
    color: "#ff6b6b"
  },
  {
    icon: "🎧",
    title: "24/7 Helpline",
    desc: "Our experts are always available to help you during your trip, day or night.",
    color: "#4d96ff"
  },
  {
    icon: "🛡️",
    title: "Best Visa Advice",
    desc: "Get expert help for your Visa. We have a very high success rate for Europe and UK.",
    color: "#ffd93d"
  }
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="why-us">
      <div className="container">
        <div className="section-header reveal">
          <span className="subtitle">Why TripCompass?</span>
          <h2 className="section-title">Experience the <span className="text-highlight">TripCompass</span> Edge</h2>
        </div>

        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="icon-wrapper" style={{ '--icon-color': stat.color }}>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <h3>{stat.title}</h3>
              <p>{stat.desc}</p>
              <div className="card-hover-line"></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .why-us {
          background-color: #fdfdfd;
          padding: 10rem 0;
          position: relative;
          overflow: hidden;
        }
        .why-us::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle at 20% 30%, rgba(0, 200, 133, 0.03) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(1, 61, 49, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .subtitle {
          color: var(--primary);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          display: block;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2.5rem;
        }
        .stat-card {
          position: relative;
          background: white;
          padding: 4rem 2.5rem;
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 1px solid rgba(0, 0, 0, 0.02);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .stat-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 200, 133, 0.1);
        }
        .icon-wrapper {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.5rem;
          position: relative;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.5s ease;
        }
        .icon-wrapper::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 28px;
          background: var(--icon-color);
          opacity: 0.1;
          z-index: -1;
        }
        .stat-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        .stat-icon {
          font-size: 2.5rem;
        }
        .stat-card h3 {
          font-size: 1.4rem;
          margin-bottom: 1.2rem;
          color: var(--secondary);
          letter-spacing: -0.02em;
        }
        .stat-card p {
          color: var(--text-light);
          font-size: 1rem;
          line-height: 1.7;
          opacity: 0.9;
        }
        .card-hover-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 4px;
          background: var(--primary);
          transition: width 0.5s ease;
        }
        .stat-card:hover .card-hover-line {
          width: 100%;
        }
        .text-highlight {
          color: var(--primary);
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
