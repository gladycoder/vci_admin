const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');
const feesController = require('../controllers/feesController');

router.get("/fees",feesController.getAllFees);
router.get("/fees/:id",feesController.getSingleFees);
router.post("/createfees",feesController.createFees);
router.put("/updatefees/:id",feesController.updateFees);
module.exports = router;