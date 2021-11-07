const mongoose = require("mongoose");
const data = mongoose.Schema({
  timestamp: {
    type: Date,
    default: new Date(),
    required: true,
  },
  data: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("data", data);
