const pool = require('../config/database');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  

const getAllUsers = async (req, res) => {  
    try {  
        const [rows] = await pool.query('SELECT user_id, fullname, username, created_at, updated_at FROM users');  
        res.json({ users: rows });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while fetching users' });  
    }  
};  

const getUserById = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const [rows] = await pool.query('SELECT user_id, fullname, username, created_at, updated_at FROM users WHERE user_id = ?', [id]);  

        if (rows.length === 0) {  
            return res.status(404).json({ error: 'No user found with the provided ID' });  
        }  

        res.json({ user: rows[0] });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while fetching the user' });  
    }  
};  

const createUser = async (req, res) => {  
    const { fullname, username, password } = req.body;  

    try {  
        const hashedPassword = await bcrypt.hash(password, 10);  
        const [result] = await pool.query('INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)', [fullname, username, hashedPassword]);  
        res.status(201).json({ id: result.insertId, fullname, username, message: 'User created successfully' });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while creating the user' });  
    }  
};  

const updateUser = async (req, res) => {  
    const { id } = req.params;  
    const { fullname, username, password } = req.body;  

    try {  
        const hashedPassword = await bcrypt.hash(password, 10);  
        const [result] = await pool.query('UPDATE users SET fullname = ?, username = ?, password = ? WHERE user_id = ?', [fullname, username, hashedPassword, id]);  

        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'No user found to update with the provided ID' });  
        }  

        res.json({ message: 'User updated successfully' });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while updating the user' });  
    }  
};  

const deleteUser = async (req, res) => {  
    const userId = req.params.id;  
    console.log('User ID for deletion:', userId);  
    
    try {  
        const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);  
        
        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'No user found to delete with the provided ID' });  
        }  
        
        res.status(200).json({ message: 'User deleted successfully' });  
    } catch (err) {  
        console.error("Error executing query:", err);  
        res.status(500).json({ error: 'An error occurred while deleting the user' });  
    }  
};  

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };