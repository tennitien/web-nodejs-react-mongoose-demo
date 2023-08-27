const Transaction = require('../models/Transaction');
const Hotel = require('../models/Hotel');
const createError = require('http-errors');

exports.createTransaction = async (req, res, next) => {
  // const userId=
  const newTransaction = new Transaction(req.body);
  try {
    const addTransaction = await newTransaction.save();
    res.status(200).json(addTransaction);
  } catch (error) {
    next(error);
  }
};
exports.getTransactionByUser = async (req, res, next) => {
  const userId = req.params.userId;
  let result = [];
  try {
    const transactions = await Transaction.find({ userId: userId });

    for (let i = 0; i < transactions.length; i++) {
      const item = transactions[i]._doc;
      try {
        let hotel = await Hotel.findById(item.hotelId);
        let hotelName = hotel.name;
        result[i] = { ...item, hotelName: hotelName };
        console.log('result :>> ', result);
      } catch (error) {
        next(error);
      }
    }
    res.status(200).json(result);
  } catch (err) {
    next(createError(404, 'Transaction not found'));
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const users = await Transaction.distinct('userId');
    const userCount = users.length;
    const transactions = await Transaction.find();
    const orders = transactions.length;
    const earings = transactions
      .map((item) => item.price)
      .reduce((acc, cur) => acc + cur, 0);

    let month = new Date().getMonth();
    const balance = transactions
      .filter((item) => item.dateStart.getMonth() === month)
      .map((item) => item.price)
      .reduce((acc, cur) => acc + cur, 0);
    res.status(200).json({
      userCount,
      orders,
      earings,
      balance,
    });
  } catch (error) {
    next(error);
  }
};
