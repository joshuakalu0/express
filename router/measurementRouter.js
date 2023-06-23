const express = require("express");
const path = require("path");
const controller = require(path.resolve(
  path.dirname(__dirname),
  "controller/measurementController"
));

const route = express.Router();
// route.param("id", controller.checkID);

route
  .route("/")
  .get(controller.getAllMeasurements)
  .post(controller.createMeasurements);
route
  .route("/:id")
  .get(controller.getMeasurements)
  .patch(controller.editMeasurements)
  .delete(controller.deleteMeasurements);

module.exports = route;
