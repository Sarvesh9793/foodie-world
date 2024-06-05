const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const dbConnect = require('./db');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON (if needed)
app.use(express.json());

// Connect to MongoDB
dbConnect();

// Define routes
app.get('/', (req, res) => {
    res.send('<h1>This is homepage baby</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is running successfully at http://localhost:${PORT}`);
});

