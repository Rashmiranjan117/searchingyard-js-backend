const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  credentials: { type: String || Number, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("user", authSchema);
module.exports = { UserModel };
