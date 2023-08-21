const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("投稿編集に成功しました。");
    } else {
      return res.status(403).json("あなたは他の投稿を編集できません。");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("投稿を削除しました!");
    } else {
      return res.status(403).json("あなたの投稿を削除できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });

      return res.status(200).json("投稿にいいねを押しました!");
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(403).json("投稿にいいねを外しました!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// router.post("/comment", async (req, res) => {
//   try {
//     const { postId, text, postDate, replies } = req.body;

//     const newComment = new Comment({
//       postId,
//       text,
//       postDate,
//       replies,
//     });

//     const savedComment = await newComment.save();

//     return res.status(201).json(savedComment);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// router.get("/comment/:postId", async (req, res) => {
//   try {
//     const comment = await Comment.find({ postId: req.params.postId });
//     if (!comment) {
//       return res.status(404).json("Post not found");
//     }

//     return res.status(200).json(comment);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

router.put("/:postId/comment", async (req, res) => {
  try {
    const { username, text, postDate } = req.body;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json("Post not found");
    }

    const newComment = {
      username,
      text,
      postDate,
      replies: [],
    };

    post.comments.push(newComment);
    await post.save();

    return res.status(201).json("Comment added successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/comments/:postId/", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json("Post not found");
    }

    return res.status(200).json(post.comments);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
