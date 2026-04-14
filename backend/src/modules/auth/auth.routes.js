// import express from 'express';

// const router = express.Router();

// router.get('/test', (req, res) => {
//   res.json({ message: 'Auth route working ✅' });
// });

// export default router;



import express from 'express';
import * as controller from './auth.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/me', protect, controller.me);
router.post('/refresh-token', controller.refreshToken);

export default router;