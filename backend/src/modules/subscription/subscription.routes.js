import express from 'express';
import * as controller from './subscription.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();

// Member routes (authenticated)
router.get('/my', protect, controller.getMySubscriptions);
router.put('/:id/cancel', protect, controller.cancel);
router.post('/:id/renew', protect, controller.renewSubscription);

// Admin routes (require admin role)
router.get('/', protect, authorize('admin'), controller.getAllSubscriptions);
router.post('/', protect, authorize('admin'), controller.create);
router.get('/expiring', protect, authorize('admin'), controller.getExpiringSubscriptions);

export default router;