import * as service from './plan.service.js';

export const getPlans = async (req, res, next) => {
  try {
    const plans = await service.getAvailablePlans();
    res.json({ success: true, data: plans });
  } catch (err) {
    next(err);
  }
};

export const purchasePlan = async (req, res, next) => {
  try {
    const { planId, paymentMethod } = req.body;
    const result = await service.purchasePlan(req.user._id, planId, paymentMethod);
    res.status(201).json({ success: true, message: 'Plan purchased successfully', data: result });
  } catch (err) {
    next(err);
  }
};