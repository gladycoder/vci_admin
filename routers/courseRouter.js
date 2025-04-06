const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const courseController = require('../controllers/courseController');

router.get("/courses",courseController.getAllCourses);
router.get("/course/:id",courseController.getSingleCourse);
router.post("/coursecreate",courseController.createCourse);
router.put("/updatecourse/:id",courseController.getUpdateCourse);
module.exports = router;