import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';

const generateToken = async (id) => {
  const user = await User.findById(id);
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  const payload = {
    sub: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };

  const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '10m' });
  const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(new ApiError(400, 'Name, email and password are required.'));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json(new ApiError(409, 'An account with this email already exists.'));
    }

    let user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    return res.status(201).json(new ApiResponse(201, {}, 'User registered successfully.'));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    console.error('Registration error:', error);
    return res
      .status(500)
      .json(new ApiError(500, 'Something went wrong while registering the user.'));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json(new ApiError(400, 'Email and password are required.'));
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json(new ApiError(404, 'User with this email is not registered.'));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json(new ApiError(401, 'Password does not match.'));
    }

    const { accessToken, refreshToken } = await generateToken(user._id);
    user.accessToken = accessToken;
    user.acceesTokenExpiry = '10m';
    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = '7d';

    await user.save();

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
    res.set('Authorization', 'Bearer ' + accessToken);

    return res.status(200).json(new ApiResponse(200, {}, 'User logged in successfully'));
  } catch (error) {
    console.error('Login error:', error);
    return res
      .status(400)
      .json(new ApiError(400, 'Something went wrong while logging in the user.'));
  }
};

const logoutUser = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json(new ApiError(401, 'Unauthorized access.'));
  }

  const setUser = await User.findOne({ email: user.email });
  if (!setUser) {
    return res.status(404).json(new ApiError(404, 'User not found.'));
  }

  setUser.accessToken = undefined;
  setUser.refreshToken = undefined;
  setUser.acceesTokenExpiry = undefined;
  setUser.refreshTokenExpiry = undefined;
  await setUser.save();

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return res.status(200).json(new ApiResponse(200, {}, 'User logged out successfully.'));
};

export { registerUser, loginUser, logoutUser };
