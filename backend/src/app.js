
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';
// import mongoSanitize from 'express-mongo-sanitize';
// import xss from 'xss-clean';
// import rateLimit from 'express-rate-limit';

// import routes from './routes/index.js';
// import errorHandler from './middleware/error.middleware.js';

// const app = express();

// // 🔐 Security
// // app.use(helmet());
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false, // 🔥 IMPORTANT
//   })
// );

// console.log('🔥 app.js loaded');

// // 🌍 CORS - FIXED VERSION
// // app.use(cors({
// //   origin: 'http://localhost:3000',  // Your frontend URL
// //   credentials: true,                // Allow cookies
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
// //   exposedHeaders: ['Set-Cookie']
// // }));
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));


// // Handle preflight requests
// app.options('*', cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// // 📦 Body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // 🍪 Cookies
// app.use(cookieParser());

// // 🧹 Data Sanitization
// app.use(mongoSanitize());
// app.use(xss());

// // ⚡ Compression
// app.use(compression());

// // 📜 Logging
// app.use(morgan('dev'));

// // 🚦 Rate Limiting - Increased for development
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 1000, // Allow 1000 requests per minute
//   skip: (req) => {
//     // Skip rate limiting for auth routes in development
//     return req.path.includes('/auth/');
//   }
// });

// app.use('/api', limiter);

// // ❤️ Health Check
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running 🚀'
//   });
// });

// // 📡 API Routes
// app.use('/api/v1', routes);

// // ❌ Global Error Handler
// app.use(errorHandler);

// export default app;






import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

import routes from './routes/index.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();

// 🔐 Security (but don't block CORS)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 🌍 CORS - MUST BE FIRST AND EXACTLY THIS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Set-Cookie', 'Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests explicitly
app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 📦 Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 🍪 Cookies
app.use(cookieParser());

// 🧹 Data Sanitization
app.use(mongoSanitize());
app.use(xss());

// ⚡ Compression
app.use(compression());

// 📜 Logging
app.use(morgan('dev'));

// ❤️ Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running 🚀'
  });
});

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`📌 ${req.method} ${req.url}`);
  console.log('   Cookies:', req.cookies);
  console.log('   Origin:', req.headers.origin);
  next();
});

// 📡 API Routes
app.use('/api/v1', routes);

// ❌ Global Error Handler
app.use(errorHandler);

export default app;