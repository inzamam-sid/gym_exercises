import express from 'express';
import * as controller from './checkin.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

// Member routes
router.post('/', protect, controller.checkIn);
router.get('/my', protect, controller.getMyCheckins);
router.get('/my/monthly/:month', protect, controller.getMonthlyCheckins);

export default router;