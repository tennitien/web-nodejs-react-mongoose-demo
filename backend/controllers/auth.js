const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postRegister = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hash,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });

    await newUser.save();
    res.status(200).send('Add new user');
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // next(createError(404, 'User not found!'))
      res.status(200).send('Not found user');
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log('login:::', user);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong password or username!'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetail } = user._doc;
    res
      .cookies('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetail });
  } catch (error) {
    next(error);
  }
};
