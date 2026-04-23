import Checkin from './checkin.model.js';

export const createCheckin = (data) => {
  return Checkin.create(data);
};

export const findTodayCheckin = (userId, date) => {
  return Checkin.findOne({ userId, date });
};

export const findUserCheckins = (userId) => {
  return Checkin.find({ userId }).sort({ checkinTime: -1 });
};

export const findMonthlyCheckins = (userId, month) => {
  return Checkin.find({
    userId,
    date: { $regex: `^${month}` }
  }).sort({ date: -1 });
};