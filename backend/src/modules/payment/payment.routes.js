import express from 'express';
import * as controller from './payment.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();

// Member routes
router.post('/request', protect, controller.createPaymentRequest);
router.get('/my-requests', protect, controller.getMyPaymentRequests);
router.get('/my', protect, controller.getMyPayments);

// Admin routes
router.get('/requests', protect, authorize('admin'), controller.getAllPaymentRequests);
router.put('/requests/:id/verify', protect, authorize('admin'), controller.verifyPayment);
router.get('/pending-count', protect, authorize('admin'), controller.getPendingCount);

export default router;