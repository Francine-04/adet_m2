const express = require('express');  
const { getStudents, getStudentsById, createStudents, updateStudents, deleteStudents } = require('../controllers/studentController');   
const authenticateToken = require('../middlewares/authMiddleware');  

const router = express.Router();  


router.get('/', authenticateToken, getStudents); 
router.get('/:id', authenticateToken, getStudentsById);  
router.post('/', authenticateToken, createStudents);  
router.put('/:id', authenticateToken, updateStudents);   
router.delete('/:id', authenticateToken, deleteStudents); 

module.exports = router;