const express = require('express');
const router = express.Router();

const attendanceController = require('../controllers/attendanceController');
const validateToken = require('../middleware/validateToken');

router.get("/attendances",attendanceController.getAllAttendance);
router.get("/attendance/:id",attendanceController.getSingleAttendance);
router.post("/createattendance",attendanceController.createAttendance);
router.put("/updateattendance/:id",attendanceController.updateAttendance);
module.exports = router;