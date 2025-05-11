const router = require("express").Router();

const { User, Blog } = require("../models");

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
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: "readings",
      attributes: {
        exclude: ["userId"],
      },
      through: {
        attributes: [],
      },
      include: {
        model: User,
        attributes: ["name"],
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
