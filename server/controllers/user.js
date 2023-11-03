import catchAsyncError from '../middlewares/catchAsyncError.js';
import userModel from '../models/user.js';
import ErrorHandler from '../utils/errorHandler.js';

export const getUsers = catchAsyncError(async (req, res, next) => {
    const users = await userModel.find();
    if (users.length === 0) {
        return next(new ErrorHandler(404, 'NO USERS'));
    }
    res.status(200).json({
        success: true,
        message: 'users fetched successfully',
        users,
    });
});

export const profile = catchAsyncError(async (req, res, next) => {
    const { password, ...user } = req.user._doc;
    res.status(200).json({ user });
});
