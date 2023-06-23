const path = require("path");
const User = require("../model/userModel");
const catchAsync = require("./../utiles/catchAsync");
const AppError = require("./../utiles/appError");
const ApiFeatures = require("./../utiles/apiFeatures");
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = new ApiFeatures(User.find(), req.query)
    .filter()
    .field()
    .pagination()
    .regx()
    .sort();
  const data = await query.query;

  res.json({
    status: "success",
    length: data.length,
    data: data,
  });
});
exports.getUsers = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new AppError(`no user found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});
exports.createUsers = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: await user,
  });
});
exports.editUsers = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return next(
      new AppError(`no user found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(201).json({
    status: "success",
    data: user,
  });
});

exports.deleteUsers = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id, req.body);
  if (!user) {
    return next(
      new AppError(`no user found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
