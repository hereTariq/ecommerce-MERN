import ErrorHandler from '../utils/errorHandler.js';
import userModel from '../models/user.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';

export const signup = catchAsyncError(async (req, res, next) => {
    const existUser = await userModel.findOne({ email: req.body.email });
    if (existUser) {
        return next(new ErrorHandler(400, 'Account already exist'));
    }

    const user = await userModel.create(req.body);
    res.cookie('jwt', user.generateToken(), {
        httpOnly: true,
        secure: false, // production will be true
    })
        .status(201)
        .json({
            message: 'user created successfully!',
            success: true,
            user,
        });
});

export const login = catchAsyncError(async (req, res, next) => {
    const existUser = await userModel.findOne({ email: req.body.email });
    if (!existUser || !(await existUser.matchPassword(req.body.password))) {
        return next(new ErrorHandler(400, 'Email or password is incorrect'));
    }
    const { password, ...user } = existUser._doc;
    res.cookie('jwt', existUser.generateToken(), {
        httpOnly: true,
        secure: false, // production will be true
    })
        .status(201)
        .json({
            message: 'user logged-in successfully!',
            success: true,
            user,
        });
});

export const logout = catchAsyncError(async (req, res, next) => {
    if (req.cookies['jwt']) {
        return res
            .clearCookie('jwt')
            .status(200)
            .json({ message: 'You have logged out' });
    }
});
