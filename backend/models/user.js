const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: "string",
    required: false,
  },
  email: {
    type: "string",
    required: true,
  },
  passWord: {
    type: "string",
    required: true,
  },
  firstName: {
    type: "string",
    required: false,
  },
  lastName: {
    type: "string",
    required: false,
  },
  role: {
    type: "string",
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
