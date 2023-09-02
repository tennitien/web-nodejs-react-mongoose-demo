const express = require('express');
const authController = require('../controllers/auth');
const { verifyAdmin } = require('../controllers/verifyToken');

const router = express.Router();

router.post('/register', authController.register);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/login/admin', authController.adminLogin);

module.exports = router;
