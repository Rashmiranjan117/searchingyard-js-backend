const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  image: { required: true, type: String },
  userId: { required: true, type: String },
  comment: {
    type: [String],
    default: [],
  },
  like: {
    required: true,
    type: Number,
    default: 0,
  },
  description: String,
});

const PostModel = mongoose.model("link", postSchema);
module.exports = { PostModel };
