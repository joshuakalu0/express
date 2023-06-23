const express = require("express");
const path = require("path");
const controller = require(path.resolve(
  path.dirname(__dirname),
  "controller/reportController"
));

const route = express.Router();
// route.param("id", controller.checkID);

route.route("/").get(controller.getAllReports).post(controller.createReports);
route
  .route("/:id")
  .get(controller.getReports)
  .patch(controller.editReports)
  .delete(controller.deleteReports);

module.exports = route;
