const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin'); // Path to the Admin model
const path = require('path');
console.log("Current working directory:", process.cwd());

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        const username = 'admin';  // Change to your desired admin username
        const password = 'adminpass';  // Change to your desired admin password
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            username,
            password: hashedPassword,
        });//node scripts/createAdmin.js

        await admin.save();
        console.log('Admin user created successfully');
        process.exit();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
