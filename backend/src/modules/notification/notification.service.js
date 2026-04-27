import Notification from './notification.model.js';

export const getUserNotifications = async (userId) => {
  return Notification.find({ userId }).sort({ createdAt: -1 });
};

export const markNotificationAsRead = async (notificationId, userId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { read: true },
    { new: true }
  );
};

export const getUnreadCount = async (userId) => {
  return Notification.countDocuments({ userId, read: false });
};