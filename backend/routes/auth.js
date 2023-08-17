const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;
