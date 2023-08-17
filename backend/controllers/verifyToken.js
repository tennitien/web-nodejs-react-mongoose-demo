const jwt = require('jsonwebtoken');
// todo: Youtube>> 1:12:30
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    // res.json(user);
    next();
  });
};
exports.verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
  });

  if (req.user.id === req.params.id || req.user.isAdmin) {
    res.json(req.user);
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
};

exports.verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    console.log('req.user :>> ', req.user);
  });

  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
};
