const express = require('express');  
const { getCourses, getCoursesById, createCourses, updateCourses, deleteCourses } = require('../controllers/coursesContoller');   
const authenticateToken = require('../middlewares/authMiddleware');  

const router = express.Router();  

 
router.get('/', authenticateToken, getCourses); 
router.get('/:id', authenticateToken, getCoursesById);  
router.post('/', authenticateToken, createCourses);  
router.put('/:id', authenticateToken, updateCourses); 
router.delete('/:id', authenticateToken, deleteCourses);  

module.exports = router;