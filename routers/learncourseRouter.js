const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const learncourseController = require('../controllers/learncourseController');

router.get("/learncourses",learncourseController.getAllLearnCourse);
router.get("/learncourse/:id",learncourseController.getSingleLearnCourse);
router.post("/learncoursecreate",learncourseController.createLearnCourse);
router.put("/updatelearncourse/:id",learncourseController.updateLearnCourse);
module.exports = router;