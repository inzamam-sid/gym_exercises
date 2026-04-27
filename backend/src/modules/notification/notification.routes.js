import express from 'express';
import * as controller from './notification.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/my', protect, controller.getMyNotifications);
router.put('/:id/read', protect, controller.markAsRead);
router.get('/unread-count', protect, controller.getUnreadCount);

export default router;