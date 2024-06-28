const globalErrorHandler = (err, req, res, next) => {
    const statusCodeError = err.status || 500;
    const messageError = err.message || 'Something went wrong!';
  
    return res.status(statusCodeError).json({
      success: false,
      status: statusCodeError,
      message: messageError,
      stack: err.stack,
    });
  };
  
  export default globalErrorHandler;