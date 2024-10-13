const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {

        const [rows] = await pool.query ('SELECT user_id, fullname, username, created_at, updated_at FROM users');
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try{
        const [rows] = await pool.query ('SELECT user_id, fullname, username, created_at, updated_at FROM users WHERE user_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err. message });
    }
};

const createUser = async (req, res) => {
    const { fullname, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)', [fullname, username, hashedPassword]);
        req. status(201).json({ id: result.inserted, fullname, username, password});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('UPDATE users SET fullname = ?, username = ?, password = ? WHERE user_id = ?', [fullname, username, hashedPassword, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User Updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err. message });
    }
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    console.log('User ID for deletion:', userId);
    
    
    let query = `DELETE FROM users WHERE id = ?`;

    
    db.execute(query, [userId], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser};