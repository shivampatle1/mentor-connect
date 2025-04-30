const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Import routes
const mentorRoutes = require('./routes/mentorRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', mentorRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});