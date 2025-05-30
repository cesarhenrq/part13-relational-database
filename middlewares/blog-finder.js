const { Blog } = require("../models");

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

module.exports = blogFinder;
