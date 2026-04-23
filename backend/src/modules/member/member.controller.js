import * as service from './member.service.js';

export const getAllMembers = async (req, res, next) => {
  try {
    const members = await service.getAllMembers(req.query);
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

export const getMemberById = async (req, res, next) => {
  try {
    const member = await service.getMemberById(req.params.id);
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

export const createMember = async (req, res, next) => {
  try {
    const member = await service.createMember(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

export const updateMember = async (req, res, next) => {
  try {
    const member = await service.updateMember(req.params.id, req.body);
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    await service.deleteMember(req.params.id);
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const toggleMemberStatus = async (req, res, next) => {
  try {
    const member = await service.toggleMemberStatus(req.params.id);
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};