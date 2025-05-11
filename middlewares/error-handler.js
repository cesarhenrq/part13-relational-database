const errorHandler = (error, _request, response, _next) => {
  console.error(`Error: ${error.name}`);
  console.error(`Message: ${error.message}`);

  if (error.name === "SequelizeValidationError") {
    return response.status(400).send({ error: error.message });
  }

  response.status(500).end();
};

module.exports = errorHandler;
