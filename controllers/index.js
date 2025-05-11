const blogsRouter = require("./blogs");
const usersRouter = require("./users");
const loginRouter = require("./login");
const authorsRouter = require("./authors");
const readinglistsRouter = require("./readinglists");
const logoutRouter = require("./logout");

module.exports = {
  blogsRouter,
  usersRouter,
  loginRouter,
  authorsRouter,
  readinglistsRouter,
  logoutRouter,
};
