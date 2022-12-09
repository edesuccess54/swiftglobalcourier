const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next)=>{
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000){
    if(err.keyValue.email){
      const message = "Email already exist";
      error = new ErrorResponse(message, 400);
    }
  }

  // if (err.name === "ValidationError") {
  //   const message = Object.values(err.e)
  // }

  res.status(error.statusCode || 500).json({
    error: error.message || "Server Error",
  })
}

module.exports = errorHandler;