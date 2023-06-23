const express = require("express");
const path = require("path");
const controller = require(path.resolve(
  path.dirname(__dirname),
  "controller/catalogController"
));

const route = express.Router();
// route.param("id", controller.checkID);

route.route("/").get(controller.getAllCatalogs).post(controller.createCatalogs);
route
  .route("/:id")
  .get(controller.getCatalogs)
  .patch(controller.editCatalogs)
  .delete(controller.deleteCatalogs);

module.exports = route;
