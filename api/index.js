const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

// Set bufferCommands to false for Vercel functions to prevent timeouts
mongoose.set('bufferCommands', false);

// Singleton-ish connection for serverless
let cachedDb = null;
async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    const db = await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000
    });
    cachedDb = db;
    return db;
}

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// --- SCHEMAS ---
const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    duration: { type: String, required: true },
    rating: { type: String, default: '5.0' },
    tag: { type: String, default: 'Best Package' },
    intro: { type: String, required: true },
    itinerary: { type: [String], default: [] },
    inclusions: { type: [String], default: [] },
    price: { type: String, default: 'Contact for Price' }
}, { timestamps: true });

const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

const enquirySchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    package: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'trip-compass-secret-key';

// --- AUTH ROUTES ---
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Middleware to protect routes
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

// --- API ROUTES ---
app.get('/api/destinations', async (req, res) => {
    try {
        const items = await Destination.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/destinations/:id', async (req, res) => {
    try {
        const item = await Destination.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/destinations', auth, async (req, res) => {
    try {
        const destinationData = { ...req.body };
        if (typeof destinationData.itinerary === 'string') {
            destinationData.itinerary = destinationData.itinerary.split('\n').map(s => s.trim()).filter(s => s);
        }
        if (typeof destinationData.inclusions === 'string') {
            destinationData.inclusions = destinationData.inclusions.split('\n').map(s => s.trim()).filter(s => s);
        }
        const newItem = new Destination(destinationData);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/destinations/:id', auth, async (req, res) => {
    try {
        const destinationData = { ...req.body };
        if (typeof destinationData.itinerary === 'string') {
            destinationData.itinerary = destinationData.itinerary.split('\n').map(s => s.trim()).filter(s => s);
        }
        if (typeof destinationData.inclusions === 'string') {
            destinationData.inclusions = destinationData.inclusions.split('\n').map(s => s.trim()).filter(s => s);
        }
        const updatedItem = await Destination.findByIdAndUpdate(req.params.id, destinationData, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/destinations/:id', auth, async (req, res) => {
    try {
        await Destination.findByIdAndDelete(req.params.id);
        res.json({ message: 'Destination deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/enquiry', async (req, res) => {
    try {
        const newEnquiry = new Enquiry(req.body);
        await newEnquiry.save();
        res.status(200).json({ success: true, message: 'Enquiry received!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/enquiries', auth, async (req, res) => {
    try {
        const items = await Enquiry.find().sort({ date: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/setup', async (req, res) => {
    try {
        const username = process.env.ADMIN_USERNAME || 'sanjay_admin';
        const password = process.env.ADMIN_PASSWORD || 'Sanjay@30';
        const exists = await Admin.findOne({ username });
        if (exists) return res.send(`Admin ${username} already exists`);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();
        res.send(`Admin account created successfully!`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Export for Vercel
module.exports = app;
