import * as service from './subscription.service.js';

export const create = async (req, res, next) => {
  try {
    const data = await service.createSubscription(req.body);
    res.status(201).json({ success: true, message: 'Subscription created', data });
  } catch (err) {
    next(err);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await service.getAllSubscriptions();
    res.json({ success: true, data: subscriptions });
  } catch (err) {
    next(err);
  }
};

export const getMySubscriptions = async (req, res, next) => {
  try {
    const data = await service.getUserSubscriptions(req.user._id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const cancel = async (req, res, next) => {
  try {
    const data = await service.cancelSubscription(req.params.id);
    res.json({ success: true, message: 'Subscription cancelled', data });
  } catch (err) {
    next(err);
  }
};

export const renewSubscription = async (req, res, next) => {
  try {
    const data = await service.renewSubscription(req.params.id);
    res.json({ success: true, message: 'Subscription renewed', data });
  } catch (err) {
    next(err);
  }
};

export const getExpiringSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await service.getExpiringSubscriptions();
    res.json({ success: true, data: subscriptions });
  } catch (err) {
    next(err);
  }
};