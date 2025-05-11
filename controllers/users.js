const router = require("express").Router();

const { User, Blog, ReadingList } = require("../models");

router.get("/", async (_req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: Blog,
      attributes: ["title", "author", "url", "likes"],
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const where = {};
  if (req.query.read) {
    where.read = req.query.read === "true";
  }

  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: Blog,
      as: "readings",
      exclude: ["userId"],
      attributes: ["id", "title", "author", "url", "likes", "year"],
      through: {
        as: "readinglists",
        model: ReadingList,
        attributes: ["id", "read"],
        where,
      },
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});
module.exports = router;
