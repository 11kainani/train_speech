function requestLogger(req, res, next) {
    // Log request information (apache style) HEADERS IP
    console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.originalUrl} ${req.headers['user-agent']}`);
  
    // Log response information after the response has been sent
    res.on('finish', () => {
      console.log(`[${new Date().toISOString()}] ${res.statusCode} ${res.statusMessage}`);
    });
  
    // Call the next middleware function
    next();
}
  
module.exports = requestLogger ;