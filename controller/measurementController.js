const path = require("path");
const Measurement = require("../model/measurementModel");
const catchAsync = require("./../utiles/catchAsync");
const AppError = require("./../utiles/appError");
const ApiFeatures = require("./../utiles/apiFeatures");
exports.getAllMeasurements = catchAsync(async (req, res, next) => {
  const query = new ApiFeatures(Measurement.find(), req.query)
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
exports.getMeasurements = catchAsync(async (req, res, next) => {
  const measurement = await Measurement.findById(req.params.id);
  if (!measurement) {
    return next(
      new AppError(`no measurement found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: measurement,
  });
});
exports.createMeasurements = catchAsync(async (req, res, next) => {
  const measurement = await Measurement.create(req.body);
  res.status(201).json({
    status: "success",
    data: await measurement,
  });
});
exports.editMeasurements = catchAsync(async (req, res, next) => {
  const measurement = await Measurement.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!measurement) {
    return next(
      new AppError(`no measurement found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(201).json({
    status: "success",
    data: measurement,
  });
});

exports.deleteMeasurements = catchAsync(async (req, res, next) => {
  const measurement = await Measurement.findByIdAndDelete(
    req.params.id,
    req.body
  );
  if (!measurement) {
    return next(
      new AppError(`no measurement found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
