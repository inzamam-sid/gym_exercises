import * as service from './checkin.service.js';

export const checkIn = async (req, res, next) => {
  try {
    const checkin = await service.checkIn(req.user._id);
    res.status(201).json({
      success: true,
      message: 'Checked in successfully!',
      data: checkin
    });
  } catch (err) {
    next(err);
  }
};

export const getMyCheckins = async (req, res, next) => {
  try {
    const checkins = await service.getUserCheckins(req.user._id);
    res.json({ success: true, data: checkins });
  } catch (err) {
    next(err);
  }
};

export const getMonthlyCheckins = async (req, res, next) => {
  try {
    const checkins = await service.getMonthlyCheckins(req.user._id, req.params.month);
    res.json({ success: true, data: checkins });
  } catch (err) {
    next(err);
  }
};