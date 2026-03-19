require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

/* Health check */
app.get('/', (req, res) => {
    res.status(200).send("Backend is running");
});

/* Add user */
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).send("Name and email required");
        }

        await db.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );

        res.status(201).send("User added");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting user");
    }
});

/* Get users */
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});

/* DELETE user (only new addition) */
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        res.status(200).send("User deleted");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});