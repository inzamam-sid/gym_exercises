import User from '../user/user.model.js';

export const findMembers = (filter, skip, limit) => {
  return User.find({ role: 'member', ...filter })
    .select('-password -refreshToken')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const countMembers = (filter) => {
  return User.countDocuments({ role: 'member', ...filter });
};

export const findMemberById = (id) => {
  return User.findById(id).select('-password -refreshToken');
};

export const findMemberByEmail = (email) => {
  return User.findOne({ email, role: 'member' });
};

export const createMember = (data) => {
  return User.create(data);
};

export const updateMember = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true }).select('-password -refreshToken');
};

export const deleteMember = (id) => {
  return User.findByIdAndDelete(id);
};