const AppError = require("../utiles/appError");

const prodError = (err, req, res, next) => {
  // operational error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // programming error
    console.log(`non operational error occured\n ${err}`);
    res.status(500).json({
      status: "error",
      err,
      message: "something went wrong",
    });
  }
};
const devError = (err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    error: err.stack,
  });
};
const handleObjectIddb = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicatedb = (err) => {
  //   const message = `invalid ${err.path}: ${err.value}`;
  //   return new AppError(message, 400);
};
module.exports = (err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    devError(err, req, res, next);
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    if (error.kind === "ObjectId") error = handleObjectIddb(err);
    // if (error.code === 11000) error = handleDuplicatedb(err);

    prodError(error, req, res, next);
  }
};
