const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requied: [true, "Please enter a email"],
    unique: [true, "Email alreadt exists"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "password must be at least 6 characters"],
  },
});
module.exports = mongoose.model("User", userSchema);
