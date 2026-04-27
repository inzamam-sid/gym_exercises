import * as service from './payment.service.js';

export const createPaymentRequest = async (req, res, next) => {
  try {
    const result = await service.createPaymentRequest({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).json({
      success: true,
      message: 'Payment request submitted successfully. Waiting for admin verification.',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const getMyPaymentRequests = async (req, res, next) => {
  try {
    const requests = await service.getUserPaymentRequests(req.user._id);
    res.json({ success: true, data: requests });
  } catch (err) {
    next(err);
  }
};

export const getMyPayments = async (req, res, next) => {
  try {
    console.log('Getting payments for user:', req.user._id);
    const payments = await service.getUserPayments(req.user._id);
    console.log('Found payments:', payments.length);
    res.json({ success: true, data: payments });
  } catch (err) {
    console.error('Error in getMyPayments:', err);
    // Return empty array instead of error
    res.json({ success: true, data: [] });
  }
};

export const getAllPaymentRequests = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const requests = await service.getAllPaymentRequests(status, parseInt(page), parseInt(limit));
    res.json({ success: true, data: requests });
  } catch (err) {
    next(err);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const result = await service.verifyPayment(
      req.params.id,
      req.user._id,
      req.body.status,
      req.body.adminNotes
    );
    res.json({
      success: true,
      message: `Payment ${result.status} successfully`,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const getPendingCount = async (req, res, next) => {
  try {
    const count = await service.getPendingCount();
    res.json({ success: true, data: { count } });
  } catch (err) {
    next(err);
  }
};