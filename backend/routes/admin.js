const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Path to Admin model
const router = express.Router();
require('dotenv').config();
const authenticateToken = require('../middlewares/auth');

//admin login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/admin/dashboard.html'));
});

router.post('/upload', authenticateToken, (req, res) => {
    // Handle file upload
    res.json({ message: 'File uploaded successfully' });
});

// Admin logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;