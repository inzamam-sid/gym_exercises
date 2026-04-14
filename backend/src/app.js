import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';

import routes from './routes/index.js';
import errorHandler from './middleware/error.middleware.js';

const app = express();
// 🔐 Security
app.use(helmet());

console.log('🔥 app.js loaded');
// 🌍 CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// 📦 Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🍪 Cookies
app.use(cookieParser());

// 🧹 Data Sanitization
app.use(mongoSanitize());
app.use(xss());

// ⚡ Compression
app.use(compression());

// 📜 Logging
app.use(morgan('dev'));

// 🚦 Rate Limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100
});

app.use('/api', limiter);

// ❤️ Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running 🚀'
  });
});

// 📡 API Routes
app.use('/api/v1', routes);

// ❌ Global Error Handler
app.use(errorHandler);


export default app;


