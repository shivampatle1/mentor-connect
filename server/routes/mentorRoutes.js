const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get mentors route
router.get('/mentors', async (req, res) => {
    try {
        const [mentors] = await db.query('SELECT * FROM mentors');
        res.json(mentors);
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ error: 'Failed to fetch mentors' });
    }
});

// Select mentor route
router.post('/select-mentor', async (req, res) => {
    const { name, email, state, mentorId } = req.body;
    
    try {
        // Insert user data into database
        const [result] = await db.query(
            'INSERT INTO user_mentor_connections (user_name, user_email, user_state, mentor_id) VALUES (?, ?, ?, ?)',
            [name, email, state, mentorId]
        );
        
        if (result.affectedRows === 1) {
            res.json({ success: true, message: 'Mentor selected successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Failed to select mentor' });
        }
    } catch (error) {
        console.error('Error selecting mentor:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;