const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({ msg: "Text or image required" });
    }

    const post = await Post.create({
      userId: req.user.id,
      text,
      image
    });

    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Feed
exports.getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("userId", "username")
    .sort({ createdAt: -1 });

  res.json(posts);
};

// Like
exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
  }

  await post.save();
  res.json(post);
};

// Comment
exports.commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    userId: req.user.id,
    text: req.body.text
  });

  await post.save();
  res.json(post);
};