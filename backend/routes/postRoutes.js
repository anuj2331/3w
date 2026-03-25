const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createPost,
  getPosts,
  likePost,
  commentPost
} = require("../controllers/postController");

router.post("/", auth, createPost);
router.get("/", getPosts);
router.put("/like/:id", auth, likePost);
router.post("/comment/:id", auth, commentPost);

module.exports = router;