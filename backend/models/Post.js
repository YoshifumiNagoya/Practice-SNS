const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  text: String,
  postDate: Date,
});

const CommentSchema = new mongoose.Schema({
  username: String,
  text: String,
  postDate: Date,
  replies: [ReplySchema],
});

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 200,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
