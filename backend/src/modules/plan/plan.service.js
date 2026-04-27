import Subscription from '../subscription/subscription.model.js';
import Payment from '../payment/payment.model.js';
import AppError from '../../utils/AppError.js';
import { addDays } from 'date-fns';

const plans = {
  'plan_monthly': {
    name: 'Monthly Plan',
    price: 50,
    duration: 30,
    planType: 'Monthly'
  },
  'plan_quarterly': {
    name: 'Quarterly Plan',
    price: 135,
    duration: 90,
    planType: 'Quarterly'
  },
  'plan_yearly': {
    name: 'Yearly Plan',
    price: 480,
    duration: 365,
    planType: 'Yearly'
  }
};

export const getAvailablePlans = async () => {
  return Object.entries(plans).map(([id, plan]) => ({
    id,
    ...plan
  }));
};

export const purchasePlan = async (userId, planId, paymentMethod) => {
  // Check if plan exists
  const plan = plans[planId];
  if (!plan) {
    throw new AppError('Invalid plan selected', 400);
  }
  
  // Check for existing active subscription
  const existingSubscription = await Subscription.findOne({
    userId,
    status: 'active',
    endDate: { $gte: new Date() }
  });
  
  if (existingSubscription) {
    throw new AppError('You already have an active subscription', 400);
  }
  
  // Calculate dates
  const startDate = new Date();
  const endDate = addDays(startDate, plan.duration);
  
  // Create subscription
  const subscription = await Subscription.create({
    userId,
    plan: plan.planType,
    startDate,
    endDate,
    status: 'active',
    price: plan.price,
    autoRenew: false
  });
  
  // Create payment record
  const receiptNumber = `REC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const payment = await Payment.create({
    userId,
    amount: plan.price,
    method: paymentMethod,
    status: 'completed',
    transactionId: receiptNumber,
    plan: plan.planType
  });
  
  return {
    subscription,
    payment,
    plan: plan
  };
};