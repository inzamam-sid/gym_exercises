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