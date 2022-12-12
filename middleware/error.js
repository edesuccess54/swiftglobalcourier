const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null
  })
}

module.exports = errorHandler














// const ErrorResponse = require("../utils/errorResponse");

// const errorHandler = (err, req, res, next)=>{
//   let error = { ...err };
//   error.message = err.message;

//   if (err.code === 11000){
//     if(err.keyValue.email){
//       const message = "Email already exist";
//       error = new ErrorResponse(message, 400);
//     }
//   }

//   res.status(error.statusCode || 500).json({
//     error: error.message || "Server Error",
//   })
// }

// module.exports = errorHandler;