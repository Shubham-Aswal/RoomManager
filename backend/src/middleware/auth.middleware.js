import asyncHandler from '../utils/asyncHandler.js';
import { Flat } from '../models/flat.models.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { User } from '../models/user.models.js';

dotenv.config();

const verifyToken = async (req, res, next) => {
  let accessToken = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
  if (!accessToken) {
    throw new ApiError(401, 'anauthorized request mdw');
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken.sub).select(
      '-password -refreshToken -emailVerificationToken -emailVerificationExpiry',
    );
    console.log(user);
    if (!user) {
      throw new ApiError(401, 'anauthorized request user,unable to create user ');
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, `anauthorized request 2 ,error : ${error}`);
  }
};

export default verifyToken;
