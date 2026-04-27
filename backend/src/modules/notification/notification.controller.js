import * as service from './notification.service.js';

export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await service.getUserNotifications(req.user._id);
    res.json({ success: true, data: notifications });
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    await service.markNotificationAsRead(req.params.id, req.user._id);
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (err) {
    next(err);
  }
};

export const getUnreadCount = async (req, res, next) => {
  try {
    const count = await service.getUnreadCount(req.user._id);
    res.json({ success: true, data: { count } });
  } catch (err) {
    next(err);
  }
};