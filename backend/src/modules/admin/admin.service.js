import User from '../user/user.model.js';
import Subscription from '../subscription/subscription.model.js';
import Payment from '../payment/payment.model.js';

export const getDashboardStats = async () => {
  const totalUsers = await User.countDocuments();

  const activeSubscriptions = await Subscription.countDocuments({
    status: 'active'
  });

  const totalRevenue = await Payment.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' }
      }
    }
  ]);

  const pendingPayments = await Payment.countDocuments({
    status: 'pending'
  });

  return {
    totalUsers,
    activeSubscriptions,
    totalRevenue: totalRevenue[0]?.total || 0,
    pendingPayments
  };
};

export const getRevenueByMonth = async () => {
  return Payment.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: { $month: '$createdAt' },
        revenue: { $sum: '$amount' }
      }
    },
    { $sort: { '_id': 1 } }
  ]);
};

export const getRecentPayments = async () => {
  return Payment.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('userId', 'name email');
};