import express from 'express';
import * as controller from './payment.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();

// Member
router.post('/', protect, controller.create);
router.get('/my', protect, controller.getMyPayments);

// Admin
router.get('/', protect, authorize('admin'), controller.getAllPayments);

export default router;