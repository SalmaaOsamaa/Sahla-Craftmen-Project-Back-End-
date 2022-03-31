const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const taskRequest = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  task: {
    type: mongoose.Types.ObjectId,
    ref: "task",
  },
  workarea: {
    type: mongoose.Types.ObjectId,
    ref: "workarea",
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  tasker: {
    type: mongoose.Types.ObjectId,
    ref: "tasker",
    required: true,
  },
  taskappointment: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["None", "pending", "approved", "rejected"],
    default: "pending",
  },
  paymentmethod: {
    type: String,
    required: true,
  },
});
const TaskRequest = mongoose.model("taskrequest", taskRequest);
module.exports = TaskRequest;
