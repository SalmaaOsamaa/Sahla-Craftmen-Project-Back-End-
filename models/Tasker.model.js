const mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const TaskerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
  image: {
    type: String,
    default:"https://picsum.photos/400"
  },
  password: {
    type: String,
    required: [true, 'Password Field is required']
  },
  task: [{ type: mongoose.Types.ObjectId, ref: "task" }],

  Skills: {
    type: [String],
    required: true,
  },
  About: {
    type: String,
  },
  role: {
    type: String,
},
  workarea: [
    {
      type: mongoose.Types.ObjectId,
      ref: "workarea",
    },
  ],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "review" }],
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  PricePerHour: {
    type: Number,
    default: 0,
  },
});
const Tasker = mongoose.model("tasker", TaskerSchema);
module.exports = Tasker;
