const express = require('express');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user');
const verifyController = require('../controllers/verifyToken');

const router = express.Router();

router.get('/', userController.getUsers);
// router.get(':/id', userController.getUser);

router.get('/checkauth', verifyController.verifyToken);

router.get(
  '/checkuser/:id',
  // verifyController.verifyToken,
  verifyController.verifyUser
);
router.get(
  '/checkadmin/:id',
  // verifyController.verifyToken,
  verifyController.verifyAdmin
);

router.delete('/:id', userController.deleteUser);
// UPDATE
router.put('/:id', userController.updateUser);

module.exports = router;
