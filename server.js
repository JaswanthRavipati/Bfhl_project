const express = require('express');
const cors = require('cors'); // Import the CORS package
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with default options
app.use(cors());

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('CORS-enabled server running successfully!');
});

// Handle the POST request for your BFHL route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ "is_success": false, "message": "Invalid data format" });
    }

    try {
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());

        const highestLowercase = lowercaseAlphabets.length > 0
            ? [lowercaseAlphabets.sort().pop()]
            : [];

        const response = {
            "is_success": true,
            "user_id": "john_doe_17091999",
            "email": "john@xyz.com",
            "roll_number": "ABCD123",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highestLowercase
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ "is_success": false, "message": "Server error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
