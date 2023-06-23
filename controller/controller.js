const AppError = require("../utiles/appError");

exports.reqDetails = (req, res, next) => {
  console.log(req.method.toUpperCase(), req.url);

  next();
};
exports.allRoute = (req, res, next) => {
  next(new AppError(`can\`t find ${req.originalUrl} on ths server`, 404));
};
