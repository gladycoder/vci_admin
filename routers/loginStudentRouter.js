const express = require('express');
const router = express.Router();
const loginStudentController = require('../controllers/loginStudentController');

router.get("/studentdetails/:id",loginStudentController.getSingleStudentDetails);
router.get("/studentcourses/:id",loginStudentController.getSingleStudentLearnCourse);
router.get("/singlecourse/:id",loginStudentController.getStudentSingleCourse);
router.put('/logoutstudent',loginStudentController.logoutStudent);
module.exports = router;