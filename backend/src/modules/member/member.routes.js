import express from 'express';
import * as controller from './member.controller.js';
import { protect } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect, authorize('admin'));

router.get('/', controller.getAllMembers);
router.get('/:id', controller.getMemberById);
router.post('/', controller.createMember);
router.put('/:id', controller.updateMember);
router.delete('/:id', controller.deleteMember);
router.put('/:id/status', controller.toggleMemberStatus);

export default router;