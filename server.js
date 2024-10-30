const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse('process.env.FIREBASE_SERVICE_ACCOUNT'); // Update this path
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projectfish-99658.firebaseio.com" // Replace YOUR_PROJECT_ID
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000; // Use Render's PORT environment variable

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the root directory

// Route to handle login form submission
app.post('/submit-login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Save user data to Firestore
        await db.collection('users').add({
            username: username,
            password: password // Note: Store passwords securely (hashed) in production!
        });
        res.send('User data saved successfully.');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data: ' + error);
    }
});

// Route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html')); 
});
app.get('/Job Postings.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Job Postings.html')); 
});
app.get('/Announcements.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Announcements.html')); 
});
app.get('/public/fblogindum.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'fblogindum.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
