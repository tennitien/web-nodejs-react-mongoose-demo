const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// router.get('/', authController.index);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);

module.exports = router;
