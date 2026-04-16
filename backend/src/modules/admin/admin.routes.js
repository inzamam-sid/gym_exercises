// import express from 'express';
// import { protect } from '../../middleware/auth.middleware.js';
// import { authorize } from '../../middleware/role.middleware.js';

// const router = express.Router();

// // Example admin route
// router.get('/dashboard', protect, authorize('admin'), (req, res) => {
//   res.json({
//     success: true,
//     message: 'Welcome Admin 🚀'
//   });
// });

// export default router;




import express from 'express';
import * as controller from './admin.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();

// 🔐 All admin-only routes
router.get('/dashboard/stats', protect, authorize('admin'), controller.getStats);
router.get('/dashboard/revenue', protect, authorize('admin'), controller.getRevenue);
router.get('/dashboard/recent-payments', protect, authorize('admin'), controller.getRecentPayments);

export default router;