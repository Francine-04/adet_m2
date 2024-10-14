const pool = require('../config/database');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  

const getCourses = async (req, res) => {  
    try {  
        const [rows] = await pool.query('SELECT course_id, course_code, course_name, user_id, dept_id, created_at, updated_at FROM courses');  
        res.json({ courses: rows });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while fetching courses' });  
    }  
};  

const getCoursesById = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const [rows] = await pool.query('SELECT course_id, course_code, course_name, user_id, dept_id, created_at, updated_at FROM courses WHERE course_id = ?', [id]);  

        if (rows.length === 0) {  
            return res.status(404).json({ error: 'No course found with the provided ID' });  
        }  

        res.json({ course: rows[0] });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while fetching the course' });  
    }  
};  

const createCourses = async (req, res) => {  
    const { course_code, course_name, user_id, dept_id } = req.body;  

    try {  
        const [result] = await pool.query('INSERT INTO courses (course_code, course_name, user_id, dept_id) VALUES (?, ?, ?, ?)', [course_code, course_name, user_id, dept_id]);  
        res.status(201).json({ id: result.insertId, course_code, course_name, user_id, dept_id, message: 'Course created successfully' });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while creating the course' });  
    }  
};  

const updateCourses = async (req, res) => {  
    const { id } = req.params;  
    const { course_code, course_name, user_id, dept_id } = req.body;  

    try {  
        const [result] = await pool.query('UPDATE courses SET course_code = ?, course_name = ?, user_id = ?, dept_id = ? WHERE course_id = ?', [course_code, course_name, user_id, dept_id, id]);  

        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'No course found to update with the provided ID' });  
        }  

        res.json({ message: 'Course has been updated successfully' });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while updating the course' });  
    }  
};  

const deleteCourses = async (req, res) => {  
    const courseId = req.params.id;  

    try {  
        const [result] = await pool.query('DELETE FROM courses WHERE course_id = ?', [courseId]);  

        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'No course found to delete with the provided ID' });  
        }  

        res.status(200).json({ message: 'Course has been deleted successfully' });  
    } catch (err) {  
        res.status(500).json({ error: 'An error occurred while deleting the course' });  
    }  
};  

module.exports = { getCourses, getCoursesById, createCourses, updateCourses, deleteCourses };