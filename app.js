// imports
const express = require("express");
const path = require("path");

// Router
const userRoute = require(path.resolve(__dirname, "router/userRouter"));
const catalogRoute = require(path.resolve(__dirname, "router/catalogRouter"));
const reportRoute = require(path.resolve(__dirname, "router/reportRouter"));
const measurementRoute = require(path.resolve(
  __dirname,
  "router/measurementRouter"
));
const controller = require(path.resolve(__dirname, "controller/controller"));
const globalErrorHandler = require(path.resolve(
  __dirname,
  "controller/errorcontroller"
));

// middlewares
const app = express();
app.use(express.json());
app.use(controller.reqDetails);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/catalogs", catalogRoute);
app.use("/api/v1/measurements", measurementRoute);
app.use("/api/v1/reports", reportRoute);
app.all("*", controller.allRoute);
app.use(globalErrorHandler);
module.exports = app;
