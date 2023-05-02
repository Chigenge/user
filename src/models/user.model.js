const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "username is required"],
    
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
    type: String,
    minlength: 8,
    maxlength: 30,
    required: true,
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
// add lastname and passwords schema 