import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();

// Example admin route
router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Welcome Admin 🚀'
  });
});

export default router;