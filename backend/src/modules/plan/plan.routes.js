import express from 'express';
import * as controller from './plan.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/available', protect, controller.getPlans);
router.post('/purchase', protect, controller.purchasePlan);

export default router;