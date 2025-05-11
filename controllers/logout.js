const router = require("express").Router();
const { Session } = require("../models");

router.delete("/", async (req, res) => {
  const session = await Session.findOne({ where: { token: req.token } });
  await session.destroy();
  res.status(204).end();
});

module.exports = router;
