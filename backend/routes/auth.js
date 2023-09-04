const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.postLogin);
router.post('/login/admin', authController.adminLogin);

module.exports = router;
