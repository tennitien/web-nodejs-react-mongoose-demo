const express = require('express');
const transactionController = require('../controllers/transaction');
const verifyController = require('../controllers/verifyToken');

const router = express.Router();

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/user/:userId', transactionController.getTransactionByUser);
router.get(
  '/summary',
  verifyController.verifyAdmin,
  transactionController.getSummary
);

module.exports = router;
