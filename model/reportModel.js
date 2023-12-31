const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const reportSchema = new Schema({
  name: { require: [true, "Name field is required"], type: String },
  description: {
    require: [true, "description field is required"],
    type: String,
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Email field is required"],
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports =
  mongoose.models.Report || mongoose.model("Report", reportSchema);
