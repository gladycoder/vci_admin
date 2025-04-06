const express = require('express');
const router = express.Router();
const adminStudentController = require('../controllers/adminStudentController');

router.post('/loginstudent',adminStudentController.loginStudent);

module.exports = router;