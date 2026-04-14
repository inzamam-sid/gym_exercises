import User from '../user/user.model.js';

export const findByEmail = (email) => {
  return User.findOne({ email }).select('+password +refreshToken');
};

export const createUser = (data) => {
  return User.create(data);
};

export const findById = (id) => {
  return User.findById(id);
};

export const saveUser = (user) => {
  return user.save();
};