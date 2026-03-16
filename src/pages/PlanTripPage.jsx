import React, { useState, useEffect } from 'react';
import maldivesImg from '../assets/maldives.png';

const PlanTripPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: 'Custom Itinerary',
    travelers: '1-2',
    date: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || '/api';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Your request has been received. Our experts will contact you within 4 hours.' });
        setFormData({ name: '', email: '', phone: '', package: 'Custom Itinerary', travelers: '1-2', date: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please check your internet or contact us via WhatsApp.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <header className="concierge-header header-with-bg">
        <img src={maldivesImg} alt="Concierge Background" className="header-bg" />
        <div className="header-overlay"></div>
        <div className="container header-content">
          <span className="badge-luxury">Exclusive Support</span>
          <h1>Plan Your <span className="text-highlight">Elite</span> Journey</h1>
          <p>Tell us your dreams, and we'll handle the details.</p>
        </div>
      </header>

      <section className="concierge-layout container">
        <div className="concierge-grid">
          <div className="form-side">
            <form className="concierge-form glass" onSubmit={handleSubmit}>
              {status.message && (
                <div className={`status-pill ${status.type}`}>
                  {status.message}
                </div>
              )}
              <div className="input-row">
                <div className="input-wrap">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                </div>
                <div className="input-wrap">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="input-row">
                <div className="input-wrap">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required />
                </div>
                <div className="input-wrap">
                  <label>Preferred Destination</label>
                  <input type="text" name="package" value={formData.package} onChange={handleChange} placeholder="e.g. Switzerland" />
                </div>
              </div>
              <div className="input-wrap">
                <label>Special Requests</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your ideal vacation..."
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="btn-luxury-submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Send Inquiry'}
              </button>
            </form>
          </div>

          <div className="info-side">
            <div className="contact-card">
              <h3>Direct Contact</h3>
              <p>Skip the form? Call us directly for immediate assistance.</p>
              <div className="contact-methods">
                <div className="method">
                  <span className="m-icon">📞</span>
                  <div>
                    <span>Call Us</span>
                    <strong>+91 98765 43210</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .header-with-bg { position: relative; height: 50vh; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center; color: white; }
        .header-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; }
        .header-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(1, 61, 49, 0.8), rgba(0,0,0,0.5)); z-index: -1; }
        .badge-luxury { border: 1px solid var(--primary); color: var(--primary); padding: 0.5rem 1rem; border-radius: 50px; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 2px; font-weight: 800; margin-bottom: 1rem; display: inline-block; }
        .concierge-header h1 { font-size: 3.5rem; margin-bottom: 1rem; }
        .text-highlight { color: var(--primary); font-family: serif; font-style: italic; }
        .concierge-layout { padding: 6rem 0; }
        .concierge-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; }
        .concierge-form { padding: 3rem; border-radius: 24px; background: white; box-shadow: 0 30px 60px rgba(0,0,0,0.05); }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .input-wrap { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .input-wrap label { font-size: 0.8rem; font-weight: 800; color: #555; text-transform: uppercase; }
        .input-wrap input, .input-wrap textarea { padding: 1rem; border-radius: 12px; border: 1px solid #eee; font-family: inherit; }
        .btn-luxury-submit { width: 100%; padding: 1.2rem; background: #013d31; color: white; border: none; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .btn-luxury-submit:hover { background: var(--primary); }
        .status-pill { padding: 1rem; border-radius: 10px; margin-bottom: 2rem; }
        .status-pill.success { background: #e8f5e9; color: #2e7d32; }
        .status-pill.error { background: #ffebee; color: #c62828; }
        .contact-card { padding: 2.5rem; background: #fff; border-radius: 24px; border: 1px solid #eee; }
        .method { display: flex; gap: 1rem; align-items: center; margin-top: 2rem; }
        .m-icon { width: 45px; height: 45px; background: #f0f7f5; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        @media (max-width: 992px) { .concierge-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default PlanTripPage;
