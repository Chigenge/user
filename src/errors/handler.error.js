//error handlers coding

const handler = (err, req, res, next) => {
  console.log(err);

  //check if the error has a status code
  const statusCode = error.statuscode || 500;

  //check if the error has a ,message
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ error: message });
};

module.exports = handler;
