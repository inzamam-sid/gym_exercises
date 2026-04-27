import PaymentRequest from './paymentRequest.model.js';
import Payment from './payment.model.js';
import Subscription from '../subscription/subscription.model.js';
import Notification from '../notification/notification.model.js';
import AppError from '../../utils/AppError.js';
import { addDays } from 'date-fns';

const plans = {
  Monthly: { price: 50, duration: 30 },
  Quarterly: { price: 135, duration: 90 },
  Yearly: { price: 480, duration: 365 }
};

export const createPaymentRequest = async ({ userId, plan, upiTransactionId, upiReference }) => {
  // Check for existing active subscription
  const activeSubscription = await Subscription.findOne({
    userId,
    status: 'active',
    endDate: { $gte: new Date() }
  });
  
  if (activeSubscription) {
    throw new AppError('You already have an active subscription', 400);
  }
  
  // Check for pending payment request
  const existingRequest = await PaymentRequest.findOne({
    userId,
    status: 'pending'
  });
  
  if (existingRequest) {
    throw new AppError('You already have a pending payment request', 400);
  }
  
  const planDetails = plans[plan];
  if (!planDetails) {
    throw new AppError('Invalid plan selected', 400);
  }
  
  // Create payment request
  const paymentRequest = await PaymentRequest.create({
    userId,
    plan,
    amount: planDetails.price,
    upiTransactionId,
    upiReference,
    status: 'pending'
  });
  
  // Create notification for admin
  await Notification.create({
    userId: userId,
    title: 'New Payment Request',
    message: `Member requested ${plan} plan. Amount: ₹${planDetails.price}`,
    type: 'payment_request',
    data: {
      paymentRequestId: paymentRequest._id,
      userId,
      plan,
      amount: planDetails.price
    }
  });
  
  return paymentRequest;
};

export const getUserPaymentRequests = async (userId) => {
  return PaymentRequest.find({ userId }).sort({ createdAt: -1 });
};

export const getUserPayments = async (userId) => {
  try {
    const payments = await Payment.find({ userId, status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(20);
    return payments;
  } catch (error) {
    console.error('Error in getUserPayments:', error);
    return []; // Return empty array instead of throwing error
  }
};

export const getAllPaymentRequests = async (status, page, limit) => {
  const filter = status && status !== 'all' ? { status } : {};
  const skip = (page - 1) * limit;
  
  const [requests, total] = await Promise.all([
    PaymentRequest.find(filter)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    PaymentRequest.countDocuments(filter)
  ]);
  
  return { requests, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const verifyPayment = async (requestId, adminId, status, adminNotes) => {
  const paymentRequest = await PaymentRequest.findById(requestId);
  if (!paymentRequest) {
    throw new AppError('Payment request not found', 404);
  }
  
  if (paymentRequest.status !== 'pending') {
    throw new AppError('Payment request already processed', 400);
  }
  
  // Update payment request
  paymentRequest.status = status;
  paymentRequest.adminNotes = adminNotes;
  paymentRequest.verifiedBy = adminId;
  paymentRequest.verifiedAt = new Date();
  await paymentRequest.save();
  
  // If verified, create subscription and payment record
  if (status === 'verified') {
    const planDetails = plans[paymentRequest.plan];
    const startDate = new Date();
    const endDate = addDays(startDate, planDetails.duration);
    
    // Check if user already has active subscription
    const existingSubscription = await Subscription.findOne({
      userId: paymentRequest.userId,
      status: 'active',
      endDate: { $gte: new Date() }
    });
    
    let subscription;
    if (existingSubscription) {
      // Extend existing subscription
      existingSubscription.endDate = addDays(existingSubscription.endDate, planDetails.duration);
      existingSubscription.plan = paymentRequest.plan;
      existingSubscription.price = planDetails.price;
      subscription = await existingSubscription.save();
    } else {
      // Create new subscription
      subscription = await Subscription.create({
        userId: paymentRequest.userId,
        plan: paymentRequest.plan,
        startDate,
        endDate,
        status: 'active',
        price: planDetails.price,
        autoRenew: false
      });
    }
    
    // Create payment record
    const transactionId = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    await Payment.create({
      userId: paymentRequest.userId,
      amount: planDetails.price,
      method: 'upi',
      status: 'completed',
      transactionId,
      plan: paymentRequest.plan,
      upiReference: paymentRequest.upiReference,
      verifiedBy: adminId,
      verifiedAt: new Date()
    });
    
    // Create notification for member
    await Notification.create({
      userId: paymentRequest.userId,
      title: 'Payment Verified! 🎉',
      message: `Your ${paymentRequest.plan} plan payment has been verified. Your subscription is now active until ${endDate.toLocaleDateString()}!`,
      type: 'payment_verified',
      data: {
        paymentRequestId: paymentRequest._id,
        subscriptionId: subscription._id,
        endDate
      }
    });
    
    return { subscription, paymentRequest, status: 'verified' };
  }
  
  // Create notification for rejected payment
  await Notification.create({
    userId: paymentRequest.userId,
    title: 'Payment Rejected ❌',
    message: `Your payment request was rejected. Reason: ${adminNotes || 'Please contact support with valid transaction proof'}`,
    type: 'payment_rejected',
    data: {
      paymentRequestId: paymentRequest._id
    }
  });
  
  return { paymentRequest, status: 'rejected' };
};

export const getPendingCount = async () => {
  return PaymentRequest.countDocuments({ status: 'pending' });
};