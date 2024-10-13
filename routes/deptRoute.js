const express = require('express');  
const { getDepartments, getDepartmentsById, createDepartments, updateDepartments, deleteDepartments } = require('../controllers/deptController');  
const authenticateToken = require('../middlewares/authMiddleware');  

const router = express.Router();  


router.get('/', authenticateToken, getDepartments); 
router.get('/:id', authenticateToken, getDepartmentsById);  
router.post('/', authenticateToken, createDepartments); 
router.put('/:id', authenticateToken, updateDepartments);  
router.delete('/:id', authenticateToken, deleteDepartments);   

module.exports = router;