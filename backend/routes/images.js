const express = require('express');
const multer = require('multer'); // File upload package
const path = require('path');
const Image = require('../models/Image');
const adminAuth = require('../middlewares/auth'); // Protecting this route with auth
const router = express.Router();


// Set up Multer for image uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Date.now() ensures unique filenames
    },
});

const upload = multer({ storage: storage });

// Image upload route (protected)
router.post('/upload', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const newImage = new Image({
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
        });

        await newImage.save();
        res.status(200).json({ message: 'Image uploaded successfully', image: newImage });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading image', error: err });
    }
});

// Route to get all images
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching images', error: err });
    }
});

module.exports = router;