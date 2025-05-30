const router = require("express").Router();

const { Blog, User, ReadingList } = require("../models");

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

// Nova rota para buscar um blog específico com seus readinglists
router.get("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, {
    attributes: {
      exclude: ["userId"],
    },
    include: [
      {
        model: User,
        attributes: ["username", "name"],
      },
      {
        model: User,
        as: "users",
        attributes: ["id", "username", "name"],
        through: {
          model: ReadingList,
          as: "readinglists",
          attributes: ["id", "read"],
        },
      },
    ],
  });

  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  res.json(blog);
});

router.post("/", async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);

  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
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
