const express = require("express");
const path = require("path");
const controller = require(path.resolve(
  path.dirname(__dirname),
  "controller/userController"
));

const route = express.Router();
// route.param("id", controller.checkID);

route.route("/").get(controller.getAllUsers).post(controller.createUsers);
route
  .route("/:id")
  .get(controller.getUsers)
  .patch(controller.editUsers)
  .delete(controller.deleteUsers);

module.exports = route;
