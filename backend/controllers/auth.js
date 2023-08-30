const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { createError } = require('../utils/error');

const createError = require('http-errors');

exports.register = async (req, res, next) => {
  try {
    const body = req.body;
    const { password, ...otherBody } = body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...otherBody,
      password: hash,
    });

    await newUser.save();
    res.send('Register user');
  } catch (error) {
    next(error);
  }
};

exports.getLogin = async (req, res, next) => {};

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User not found'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    console.log('token :>> ', token);
    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
