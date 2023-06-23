const path = require("path");
const Catalog = require("../model/catalogModel");
const catchAsync = require("./../utiles/catchAsync");
const AppError = require("./../utiles/appError");
const ApiFeatures = require("./../utiles/apiFeatures");
exports.getAllCatalogs = catchAsync(async (req, res, next) => {
  const query = new ApiFeatures(Catalog.find(), req.query)
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
exports.getCatalogs = catchAsync(async (req, res, next) => {
  const catalog = await Catalog.findById(req.params.id);
  if (!catalog) {
    return next(
      new AppError(`no catalog found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: catalog,
  });
});
exports.createCatalogs = catchAsync(async (req, res, next) => {
  const catalog = await Catalog.create(req.body);
  res.status(201).json({
    status: "success",
    data: await catalog,
  });
});
exports.editCatalogs = catchAsync(async (req, res, next) => {
  const catalog = await Catalog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!catalog) {
    return next(
      new AppError(`no catalog found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(201).json({
    status: "success",
    data: catalog,
  });
});

exports.deleteCatalogs = catchAsync(async (req, res, next) => {
  const catalog = await Catalog.findByIdAndDelete(req.params.id, req.body);
  if (!catalog) {
    return next(
      new AppError(`no catalog found with that ID:${req.params.id}`, 404)
    );
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
