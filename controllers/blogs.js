const router = require("express").Router();

const { Blog } = require("../models");

const { blogFinder } = require("../middlewares");

router.get("/", async (_req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
  if (!req.blog) {
    return res.status(404).end();
  }
  await blog.destroy();
  res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res) => {
  if (!req.blog) {
    return res.status(404).end();
  }
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

module.exports = router;
