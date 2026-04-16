import * as service from './admin.service.js';

export const getStats = async (req, res, next) => {
  try {
    const data = await service.getDashboardStats();

    res.json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

export const getRevenue = async (req, res, next) => {
  try {
    const data = await service.getRevenueByMonth();

    res.json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

export const getRecentPayments = async (req, res, next) => {
  try {
    const data = await service.getRecentPayments();

    res.json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};