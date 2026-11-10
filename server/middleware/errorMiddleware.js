export const notFound = (req, res, next) => {
    const error = new Error(`Not Found -${req.originalUrl}`);
    res.status(404)
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 400;
        message: 'resource not found invalid ID Format';
    }
    
if (err.code === 11000) {
  statusCode = 400;
  const field = Object.keys(err.keyValue)[0];
  message = `Duplicate field value entered: ${field} already exists`;
}

// Case 3: Mongoose Schema Validation Error (e.g., missing required fields, bad enum)
if (err.name === "ValidationError") {
  statusCode = 400;
  message = Object.values(err.errors)
    .map((val) => val.message)
    .join(", ");
}

// Case 4: JWT Errors
if (err.name === "JsonWebTokenError") {
  statusCode = 401;
  message = "Invalid token, authorization denied";
}

if (err.name === "TokenExpiredError") {
  statusCode = 401;
  message = "Token has expired, please log in again";
}

res.status(statusCode).json({
  success: false,
  message: message,
  // Only show the stack trace in development mode for security reasons
  stack: process.env.NODE_ENV === "production" ? null : err.stack,
});

}