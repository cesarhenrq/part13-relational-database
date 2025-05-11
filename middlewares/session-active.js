const { Session } = require("../models");

const sessionActive = async (req, res, next) => {
  const authorization = req.get("authorization");
  const token = authorization.substring(7);
  const session = await Session.findOne({ where: { token } });
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  next();
};

module.exports = sessionActive;
