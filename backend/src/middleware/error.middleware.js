const errorHandler = (err, req, res, next) => {
  console.error(err);

   // ✅ ADD THESE HEADERS
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
};

export default errorHandler;