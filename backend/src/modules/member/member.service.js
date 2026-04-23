import * as repo from './member.repository.js';
import AppError from '../../utils/AppError.js';
import bcrypt from 'bcryptjs';

export const getAllMembers = async (query) => {
  const { search, page = 1, limit = 10 } = query;
  const filter = {};
  
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  
  const skip = (page - 1) * limit;
  const [members, total] = await Promise.all([
    repo.findMembers(filter, skip, parseInt(limit)),
    repo.countMembers(filter)
  ]);
  
  return { members, total, page: parseInt(page), limit: parseInt(limit) };
};

export const getMemberById = async (id) => {
  const member = await repo.findMemberById(id);
  if (!member) throw new AppError('Member not found', 404);
  return member;
};

export const createMember = async (data) => {
  const existing = await repo.findMemberByEmail(data.email);
  if (existing) throw new AppError('Email already exists', 400);
  
  // Hash password
  const hashedPassword = await bcrypt.hash(data.password || 'member123', 10);
  
  return repo.createMember({
    ...data,
    password: hashedPassword,
    role: 'member'
  });
};

export const updateMember = async (id, data) => {
  const member = await repo.updateMember(id, data);
  if (!member) throw new AppError('Member not found', 404);
  return member;
};

export const deleteMember = async (id) => {
  const member = await repo.deleteMember(id);
  if (!member) throw new AppError('Member not found', 404);
  return member;
};

export const toggleMemberStatus = async (id) => {
  const member = await repo.findMemberById(id);
  if (!member) throw new AppError('Member not found', 404);
  
  return repo.updateMember(id, { isActive: !member.isActive });
};