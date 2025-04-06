const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const studentController = require('../controllers/studentController');

router.get("/students",studentController.allStudents);
router.get("/student/:id",studentController.singleStudent);
router.post("/studentcreate",studentController.createStudent);
router.put("/updatestudent/:id",studentController.updateStudent);

module.exports = router;