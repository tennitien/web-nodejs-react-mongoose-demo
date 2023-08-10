const express = require('express');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.get('/', userController.getUsers);
router.get(':/id', userController.getUser);

// router.get('/checkauthentication', verifyToken);
// router.get('/check', (req, res, next) => {
//   console.log(req);
//   const token = req.rawHeaders;
//   console.log('token::::', token);
// });

router.delete(':/id', userController.deleteUser);
// UPDATE
router.put('/:id', userController.updateUser);

module.exports = router;
