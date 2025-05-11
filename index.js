const express = require("express");
require("express-async-errors");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const {
  errorHandler,
  tokenExtractor,
  sessionActive,
} = require("./middlewares");

const {
  blogsRouter,
  usersRouter,
  loginRouter,
  authorsRouter,
  readinglistsRouter,
  logoutRouter,
} = require("./controllers");

app.use(express.json());

app.use("/api/blogs", tokenExtractor, sessionActive, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readinglistsRouter);
app.use("/api/logout", tokenExtractor, sessionActive, logoutRouter);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
