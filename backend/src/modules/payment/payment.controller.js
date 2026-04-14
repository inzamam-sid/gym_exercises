import * as service from './payment.service.js';

export const create = async (req, res, next) => {
  try {
    const payment = await service.createPayment({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Payment successful',
      data: payment
    });
  } catch (err) {
    next(err);
  }
};

export const getMyPayments = async (req, res, next) => {
  try {
    const payments = await service.getMyPayments(req.user._id);

    res.json({ success: true, data: payments });
  } catch (err) {
    next(err);
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await service.getAllPayments();

    res.json({ success: true, data: payments });
  } catch (err) {
    next(err);
  }
};