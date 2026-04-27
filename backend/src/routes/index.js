import express from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import subscriptionRoutes from '../modules/subscription/subscription.routes.js';
import adminRoutes from '../modules/admin/admin.routes.js';
import paymentRoutes from '../modules/payment/payment.routes.js';
import checkinRoutes from '../modules/checkin/checkin.routes.js';
import memberRoutes from '../modules/member/member.routes.js';
import planRoutes from '../modules/plan/plan.routes.js';
import notificationRoutes from '../modules/notification/notification.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/admin', adminRoutes);
router.use('/payments', paymentRoutes);
router.use('/checkins', checkinRoutes);
router.use('/members', memberRoutes);
router.use('/plans', planRoutes);
router.use('/notifications', notificationRoutes);

export default router;