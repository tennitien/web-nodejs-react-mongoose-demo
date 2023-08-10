const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  //   const token = req.cookies.access_token;
  console.log();
  //   if (!token) {
  //     return next(createError(401, 'You are not authenticated!'));
  //   }
  //   jwt.verify(token, process.env.JWT, (err, user) => {
  //     if (err) {
  //       return next(createError(403, 'Token is not valid'));
  //     }
  //     req.user = user;
  next();
  //   });
};
