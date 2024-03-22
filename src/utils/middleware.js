// const logger = require('./logger')

// const requestLogger = (request, response, next) => {
//   logger.info('Method:', request.method)
//   logger.info('Path:  ', request.path)
//   logger.info('Body:  ', request.body)
//   logger.info('---')
//   next()
// }

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// const errorHandler = (error, request, response, next) => {
//   logger.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      status_code: err.statusCode,
      message: err.message,
      //stack: err.stack
    });
  }
  console.error("ERROR 💥", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendErrorDev(err, req, res);
};
