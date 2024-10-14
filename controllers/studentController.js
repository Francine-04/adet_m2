const pool = require('../config/database');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  

const getStudents = async (req, res) => {  
    try {  
        const [rows] = await pool.query('SELECT student_id, lname, fname, mname, user_id, course_id, created_at, updated_at FROM students');  
        res.json({ students: rows });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while fetching students' });  
    }  
};  

const getStudentsById = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const [rows] = await pool.query('SELECT student_id, lname, fname, mname, user_id, course_id, created_at, updated_at FROM students WHERE student_id = ?', [id]);  

        if (rows.length === 0) {  
            return res.status(404).json({ error: 'No student found with the provided ID' });  
        }  

        res.json({ student: rows[0] });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while fetching the student' });  
    }  
};  

const createStudents = async (req, res) => {  
    const { lname, fname, mname, user_id, course_id } = req.body;  

    try {  
        const [result] = await pool.query('INSERT INTO students (lname, fname, mname, user_id, course_id) VALUES (?, ?, ?, ?, ?)', [lname, fname, mname, user_id, course_id]);  
        res.status(201).json({ id: result.insertId, lname, fname, mname, user_id, course_id, message: 'Student created successfully' });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while creating the student' });  
    }  
};  

const updateStudents = async (req, res) => {  
    const { id } = req.params;  
    const { lname, fname, mname, user_id, course_id } = req.body;  

    try {  
        const [result] = await pool.query('UPDATE students SET lname = ?, fname = ?, mname = ?, user_id = ?, course_id = ? WHERE student_id = ?', [lname, fname, mname, user_id, course_id, id]);  

        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'No student found to update with the provided ID' });  
        }  

        res.json({ message: 'Student has been updated successfully' });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while updating the student' });  
    }  
};  

const deleteStudents = async (req, res) => {  
    const studentId = req.params.id;  
    console.log('Student ID for deletion:', studentId);  

    try {  
        const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [studentId]);  

        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'No student found to delete with the provided ID' });  
        }  

        res.status(200).json({ message: 'Student has been deleted successfully' });  
    } catch (err) {  
        console.error("Error executing query:", err);  
        res.status(500).json({ error: 'An error occurred while deleting the student' });  
    }  
};  

module.exports = { getStudents, getStudentsById, createStudents, updateStudents, deleteStudents };