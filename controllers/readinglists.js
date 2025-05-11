const router = require("express").Router();
const { ReadingList, User, Blog } = require("../models");
const { tokenExtractor } = require("../middlewares");

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const blog = await Blog.findByPk(req.body.blogId);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  if (user.id !== req.body.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const readingList = await ReadingList.create(req.body);
  res.json(readingList);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  if (!readingList) {
    return res.status(404).json({ error: "Reading list not found" });
  }

  if (readingList.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  readingList.read = req.body.read;
  await readingList.save();
  res.json(readingList);
});

module.exports = router;
