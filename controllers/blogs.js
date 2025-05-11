const router = require("express").Router();

const { Blog, User } = require("../models");

const { blogFinder } = require("../middlewares");

const Op = require("sequelize").Op;

router.get("/", async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    where,
    attributes: {
      exclude: ["userId"],
    },
    include: {
      model: User,
      attributes: ["username", "name"],
    },
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  console.log({
    ...req.body,
    userId: user.id,
    year: String(req.body.year),
  });
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    year: 1992,
  });
  res.json(blog);
});

router.delete("/:id", blogFinder, async (req, res) => {
  if (!req.blog) {
    return res.status(404).end();
  }

  if (req.blog.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  await req.blog.destroy();
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
