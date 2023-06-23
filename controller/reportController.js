const path = require("path");
const Report = require("../model/reportModel");
const catchAsync = require("./../utiles/catchAsync");
const AppError = require("./../utiles/appError");
const ApiFeatures = require("./../utiles/apiFeatures");
exports.getAllReports = catchAsync(async (req, res, next) => {
  const query = new ApiFeatures(Report.find(), req.query)
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
exports.getReports = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    return next(
      new AppError(`no Report found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: report,
  });
});
exports.createReports = catchAsync(async (req, res, next) => {
  const report = await Report.create(req.body);
  res.status(201).json({
    status: "success",
    data: await report,
  });
});
exports.editReports = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!report) {
    return next(
      new AppError(`no Report found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(201).json({
    status: "success",
    data: report,
  });
});

exports.deleteReports = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndDelete(req.params.id, req.body);
  if (!report) {
    return next(
      new AppError(`no Report found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
