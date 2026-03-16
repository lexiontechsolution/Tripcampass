import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    const [destinations, setDestinations] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [view, setView] = useState('destinations'); // 'destinations' or 'enquiry'

    // Form State for Destination
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        image: '',
        duration: '',
        rating: '5.0',
        tag: 'Best Package',
        category: 'premium',
        intro: '',
        price: '',
        itinerary: '', // String in form, array in DB
        inclusions: '' // String in form, array in DB
    });
    const [editId, setEditId] = useState(null);

    const API_BASE = import.meta.env.VITE_API_BASE || '/api';

    useEffect(() => {
        if (isLoggedIn) {
            fetchDestinations();
            fetchEnquiries();
        }
    }, [isLoggedIn]);

    const fetchDestinations = async () => {
        try {
            const res = await fetch(`${API_BASE}/destinations`);
            const data = await res.json();
            setDestinations(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchEnquiries = async () => {
        try {
            const response = await fetch(`${API_BASE}/admin/enquiries`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            const data = await response.json();
            setEnquiries(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await fetch(`${API_BASE}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                setIsLoggedIn(true);
            } else {
                setLoginError(data.error || 'Login failed');
            }
        } catch (err) {
            setLoginError('Server connection error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = { ...formData };

        // Convert file to base64 if selected
        if (selectedFile) {
            const reader = new FileReader();
            const base64Promise = new Promise((resolve) => {
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(selectedFile);
            });
            payload.image = await base64Promise;
        }

        try {
            const url = editId ? `${API_BASE}/destinations/${editId}` : `${API_BASE}/destinations`;
            const method = editId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert(editId ? 'Updated!' : 'Added!');
                setFormData({ name: '', location: '', image: '', duration: '', rating: '5.0', tag: 'Best Package', intro: '', price: '', itinerary: '', inclusions: '' });
                setSelectedFile(null);
                setImagePreview(null);
                setEditId(null);
                fetchDestinations();
            } else {
                const errData = await res.json();
                alert(errData.error || 'Server error');
            }
        } catch (err) {
            alert('Request failed');
        }
        setLoading(false);
    };

    const handleEdit = (item) => {
        const formattedItem = { ...item };
        if (Array.isArray(item.itinerary)) formattedItem.itinerary = item.itinerary.join('\n');
        if (Array.isArray(item.inclusions)) formattedItem.inclusions = item.inclusions.join('\n');

        setFormData(formattedItem);
        setEditId(item.id || item._id);
        setImagePreview(null);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API_BASE}/destinations/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (res.ok) fetchDestinations();
        } catch (err) {
            console.error(err);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="login-screen">
                <div className="login-card">
                    <h2>Admin Login</h2>
                    <p>Enter your credentials to manage TripCompass</p>
                    <form onSubmit={handleLogin}>
                        {loginError && <div className="error-msg">{loginError}</div>}
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} required placeholder="admin" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} required placeholder="••••••••" />
                        </div>
                        <button type="submit" className="login-btn">Secure Login</button>
                    </form>
                    <div className="login-hint">Admin: admin / admin123@</div>
                </div>
                <style>{`
                    .login-screen { 
                        height: 100vh; display: flex; align-items: center; justify-content: center; 
                        background: linear-gradient(135deg, #013d31 0%, #001a15 100%);
                        color: white;
                    }
                    .login-card { 
                        background: white; color: #333; padding: 3rem; border-radius: 24px; 
                        width: 100%; max-width: 400px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    }
                    .login-card h2 { margin-bottom: 0.5rem; color: #013d31; }
                    .login-card p { font-size: 0.9rem; color: #666; margin-bottom: 2rem; }
                    .error-msg { background: #ffebee; color: #c62828; padding: 0.8rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.85rem; }
                    .login-btn { 
                        width: 100%; padding: 1rem; background: #013d31; color: white; border: none; 
                        border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.3s;
                    }
                    .login-btn:hover { background: #00c885; transform: translateY(-2px); }
                    .login-hint { margin-top: 1.5rem; font-size: 0.75rem; text-align: center; color: #aaa; }
                    .form-group { margin-bottom: 1.5rem; }
                    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 700; font-size: 0.85rem; }
                    .form-group input { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 10px; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="container flex-between">
                    <div className="admin-brand">
                        <a href="/" className="back-home-link">← Home</a>
                        <div className="brand-divider"></div>
                        <div>
                            <h1>TripCompass Admin</h1>
                            <p>Dashboard</p>
                        </div>
                    </div>
                    <div className="header-actions">
                        <div className="tab-buttons">
                            <button onClick={() => setView('destinations')} className={view === 'destinations' ? 'active' : ''}>
                                Packages
                            </button>
                            <button onClick={() => setView('enquiry')} className={view === 'enquiry' ? 'active' : ''}>
                                Enquiries
                            </button>
                        </div>
                        {view === 'enquiry' && (
                            <button onClick={() => {
                                if (enquiries.length === 0) return alert('No enquiries to export');
                                const headers = ['Date', 'Name', 'Phone', 'Email', 'Package', 'Message'];
                                const rows = enquiries.map(enq => [
                                    new Date(enq.date).toLocaleDateString(),
                                    `"${enq.name}"`,
                                    `"${enq.phone}"`,
                                    `"${enq.email}"`,
                                    `"${enq.package}"`,
                                    `"${enq.message.replace(/"/g, '""')}"`
                                ]);
                                const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
                                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                                const link = document.createElement('a');
                                const url = URL.createObjectURL(blob);
                                link.setAttribute('href', url);
                                link.setAttribute('download', `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
                                link.style.visibility = 'hidden';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }} className="export-btn">
                                📊 Export CSV
                            </button>
                        )}
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="container admin-container">
                {view === 'destinations' ? (
                    <div className="dest-section">
                        <div className="form-card card">
                            <h3>{editId ? 'Edit Package' : 'Create New Package'}</h3>
                            <form onSubmit={handleSubmit} className="admin-form">
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label>Package Name</label>
                                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Photo</label>
                                        <div className={`dropzone ${imagePreview ? 'has-preview' : ''}`} onClick={() => document.getElementById('fileInput').click()}>
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="preview-img" />
                                            ) : (
                                                <div className="upload-placeholder">
                                                    <span>📷 Upload Photo</span>
                                                </div>
                                            )}
                                            <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Duration</label>
                                        <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Rating (1.0 - 5.0)</label>
                                        <input type="text" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Tag / Badge</label>
                                        <input type="text" value={formData.tag} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Price (e.g. $1,200)</label>
                                        <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                                            <option value="premium">Premium</option>
                                            <option value="couple">Couple</option>
                                            <option value="family">Family/Friends</option>
                                            <option value="solo">Solo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Short Description (Hero Intro)</label>
                                    <textarea rows="2" value={formData.intro} onChange={(e) => setFormData({ ...formData, intro: e.target.value })} required></textarea>
                                </div>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label>Detailed Itinerary (One per line)</label>
                                        <textarea rows="5" value={formData.itinerary} onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })} placeholder="Day 1: Arrival...&#10;Day 2: City Tour..." required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Inclusions (One per line)</label>
                                        <textarea rows="5" value={formData.inclusions} onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })} placeholder="Premium Stay&#10;Private Car" required></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="admin-btn-save" disabled={loading}>
                                    {loading ? 'Transmitting...' : (editId ? 'Save Changes' : 'Publish Destination')}
                                </button>
                                {editId && <button type="button" onClick={() => { setEditId(null); setFormData({ name: '', location: '', image: '', duration: '', rating: '5.0', tag: 'Best Package', intro: '' }) }} className="btn-cancel">Cancel</button>}
                            </form>
                        </div>

                        <div className="list-section">
                            <h3>Active Destinations</h3>
                            <div className="admin-list">
                                {destinations.map(item => (
                                    <div key={item._id} className="admin-item-card card">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                        />
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <p>{item.location} • {item.duration}</p>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                                            <button onClick={() => handleDelete(item._id)} className="btn-delete">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="enquiry-section">
                        <h3>Customer Enquiries</h3>
                        <div className="enquiry-list">
                            {enquiries.map(enq => (
                                <div key={enq._id} className="enquiry-item card">
                                    <div className="enq-header">
                                        <strong>{enq.name}</strong>
                                        <span className="enq-date">{new Date(enq.date).toLocaleDateString()}</span>
                                    </div>
                                    <p><strong>Contact:</strong> {enq.phone} | {enq.email}</p>
                                    <p><strong>Package Interest:</strong> {enq.package}</p>
                                    <div className="enq-msg">{enq.message}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .admin-page { background: #f8faf9; min-height: 100vh; padding-bottom: 5rem; font-family: 'Inter', sans-serif; }
                .admin-header { background: #013d31; color: white; padding: 1.2rem 0; box-shadow: 0 4px 25px rgba(0,0,0,0.15); margin-bottom: 3rem; position: relative; z-index: 100; }
                .flex-between { display: flex; justify-content: space-between; align-items: center; }
                
                .admin-brand { display: flex; align-items: center; gap: 1.5rem; }
                .back-home-link { color: #00c885; text-decoration: none; font-weight: 700; font-size: 0.9rem; white-space: nowrap; transition: 0.3s; }
                .back-home-link:hover { color: white; transform: translateX(-3px); }
                .brand-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.2); }
                
                .admin-header h1 { font-size: 1.3rem; margin: 0; line-height: 1.2; white-space: nowrap; }
                .admin-header p { font-size: 0.7rem; margin: 2px 0 0; opacity: 0.7; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }

                .header-actions { display: flex; gap: 2rem; align-items: center; }
                .tab-buttons { display: flex; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.05); }
                .tab-buttons button { background: none; border: none; color: white; padding: 0.7rem 1.4rem; border-radius: 10px; cursor: pointer; opacity: 0.6; font-weight: 700; font-size: 0.85rem; transition: 0.3s; }
                .tab-buttons button.active { background: #00c885; color: white; opacity: 1; box-shadow: 0 4px 12px rgba(0, 200, 133, 0.2); }
                .tab-buttons button:hover:not(.active) { opacity: 1; background: rgba(255,255,255,0.05); }
                
                .logout-btn { color: white; background: rgba(255, 138, 128, 0.1); border: 1px solid rgba(255, 138, 128, 0.2); padding: 0.6rem 1.2rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.85rem; transition: 0.3s; }
                .logout-btn:hover { background: #ff5252; border-color: #ff5252; color: white; }
                
                .export-btn { background: #007bff; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.85rem; transition: 0.3s; }
                .export-btn:hover { background: #0056b3; transform: scale(1.05); }

                .admin-container { max-width: 1100px; margin: 0 auto; }
                .card { background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.03); margin-bottom: 2rem; border: 1px solid #eee; }
                
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                .form-group { margin-bottom: 1.5rem; }
                .form-group label { display: block; margin-bottom: 0.6rem; font-weight: 700; color: #444; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
                .form-group input, .form-group textarea { width: 100%; padding: 0.9rem; border: 1px solid #e0e0e0; border-radius: 12px; font-family: inherit; font-size: 1rem; }
                .form-group input:focus { border-color: #00c885; outline: none; }

                .dropzone { border: 2px dashed #ddd; border-radius: 15px; height: 120px; display: flex; align-items: center; justify-content: center; cursor: pointer; overflow: hidden; background: #fafafa; }
                .preview-img { width: 100%; height: 100%; object-fit: cover; }
                .upload-placeholder { color: #888; font-weight: 600; }

                .admin-btn-save { background: #013d31; color: white; border: none; padding: 1.2rem 2.5rem; border-radius: 14px; font-weight: 700; cursor: pointer; width: 100%; font-size: 1.1rem; }
                .admin-btn-save:hover { background: #00c885; }
                .btn-cancel { background: none; border: none; color: #666; margin-top: 1rem; width: 100%; cursor: pointer; font-weight: 600; }

                .admin-list { display: grid; gap: 1rem; }
                .admin-item-card { display: flex; align-items: center; gap: 2rem; padding: 1rem; }
                .admin-item-card img { width: 100px; height: 75px; object-fit: cover; border-radius: 12px; }
                .item-info { flex: 1; }
                .item-actions { display: flex; gap: 0.8rem; }
                .item-actions button { padding: 0.6rem 1.2rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; }
                .btn-edit { background: #e8f5e9; color: #2e7d32; }
                .btn-delete { background: #ffebee; color: #c62828; }

                .enquiry-item { border-left: 5px solid #00c885; }
                .enq-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
                .enq-msg { background: #f5f7f6; padding: 1.5rem; border-radius: 12px; margin-top: 1rem; line-height: 1.6; }
            `}</style>
        </div>
    );
};

export default AdminPage;
