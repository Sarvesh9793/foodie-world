const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./db');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
dbConnect();

// Define routes
app.get('/', (req, res) => {
  res.send('<h1>This is homepage baby</h1>');
});

app.use('/api', require('./Routes/CreatUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Start the server
app.listen(PORT, () => {
  console.log(`App is running successfully at http://localhost:${PORT}`);
});

