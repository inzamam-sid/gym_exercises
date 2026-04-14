import * as service from './auth.service.js';

const sendCookie = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false
  });
};

export const register = async (req, res, next) => {
  try {
    const user = await service.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered',
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } =
      await service.loginUser(req.body);

    sendCookie(res, accessToken, refreshToken);

    res.json({
      success: true,
      message: 'Login successful',
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.json({ success: true, message: 'Logged out' });
};

export const me = async (req, res, next) => {
  try {
    const user = await service.getMe(req.user.userId);

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    const newAccessToken = await service.refreshTokenService(token);

    res.cookie('accessToken', newAccessToken, { httpOnly: true });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};