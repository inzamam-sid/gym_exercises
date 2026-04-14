import express from 'express';

// Import module routes
import authRoutes from '../modules/auth/auth.routes.js';
import subscriptionRoutes from '../modules/subscription/subscription.routes.js';
import adminRoutes from '../modules/admin/admin.routes.js';
import paymentRoutes from '../modules/payment/payment.routes.js';

const router = express.Router();

router.use('/admin', adminRoutes);

// Route groups
router.use('/auth', authRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/payments', paymentRoutes);

export default router;