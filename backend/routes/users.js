const express = require('express');

const userController = require('../controllers/user');
const verifyController = require('../controllers/verifyToken');

const router = express.Router();

// admin
router.put('/:id', verifyController.verifyAdmin, userController.updateUser);
router.delete('/:id', verifyController.verifyAdmin, userController.deleteUser);
router.get('/checkauth', verifyController.verifyToken);
router.get('/checkadmin/:id', verifyController.verifyAdmin);

// user
router.get('/', userController.getUsers);
router.get('/detail/:id', userController.getUser);
router.get('/checkuser/:id', verifyController.verifyUser);

module.exports = router;
