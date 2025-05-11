const express = require("express");
require("express-async-errors");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const { errorHandler, tokenExtractor } = require("./middlewares");

const { blogsRouter, usersRouter, loginRouter } = require("./controllers");
app.use(express.json());

app.use("/api/blogs", tokenExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
