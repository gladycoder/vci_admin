const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.post('/createAdmin',adminController.createAdmin);
router.post('/vcigladsonadmin',adminController.loginAdmin);
router.put('/adminLogout',adminController.logoutAdmin);
module.exports = router;