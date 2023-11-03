import orderModel from '../models/order.js';
import cartModel from '../models/cart.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';

export const createOrder = catchAsyncError(async (req, res, next) => {
    const cart = await cartModel.findOne({ userId: req.user._id });
    if (!cart) {
        return next(
            new ErrorHandler(
                404,
                'Cart is empty. Add products to the cart before creating an order.'
            )
        );
    }
    const order = await orderModel.create({
        userId: req.user._id,
        products: cart.products,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalProducts,
    });

    cart.products = [];
    cart.totalPrice = 0;
    cart.totalProducts = 0;
    await cart.save();
    res.status(201).json({
        message: 'order created successfully',
        success: true,
        order,
    });
});

export const getOrder = catchAsyncError(async (req, res, next) => {
    const order = await orderModel
        .findOne({ userId: req.user._id })
        .populate('products.productId');
    if (!order) {
        return next(
            new ErrorHandler(404, 'Order is empty. Add products to the order.')
        );
    }
    res.status(200).json({
        success: true,
        message: 'order fetched successfully',
        order,
    });
});
