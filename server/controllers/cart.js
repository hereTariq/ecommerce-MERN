import cartModel from '../models/cart.js';
import productModel from '../models/product.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';

export const addProductToCart = catchAsyncError(async (req, res, next) => {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
        return next(new ErrorHandler(404, 'NO PRODUCT'));
    }
    let cart = await cartModel.findOne({ userId: req.user._id });
    if (!cart) {
        cart = await cartModel.create({
            userId: req.user._id,
            products: [{ productId, total: product.price, quantity: 1 }],
        });
    } else {
        let productIndex = cart.products.findIndex(
            (product) => product.productId == productId
        );
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
            cart.products[productIndex].total =
                cart.products[productIndex].quantity * product.price;
        } else {
            cart.products.push({
                productId,
                total: product.price,
                quantity: 1,
            });
        }
    }
    cart.totalPrice = 0;
    cart.totalProducts = 0;
    for (let i = 0; i < cart.products.length; i++) {
        cart.totalPrice += cart.products[i].total;
        cart.totalProducts += cart.products[i].quantity;
    }
    await cart.save();
    res.status(201).json({
        success: true,
        message: 'cart added successfully',
        cart,
    });
});

export const getCart = catchAsyncError(async (req, res, next) => {
    const cart = await cartModel
        .find({ userId: req.user._id })
        .populate('products.productId');
    if (cart.length == 0) {
        return next(new ErrorHandler(404, 'NO PRODUCTS ADDED TO CART'));
    }
    res.status(200).json({
        message: 'cart fetched successfully',
        success: true,
        cart,
    });
});

export const deleteCart = catchAsyncError(async (req, res, next) => {
    const cart = await cartModel.findOneAndDelete({ userId: req.user._id });
    if (!cart) {
        return next(new ErrorHandler(404, 'NO CART FOUND'));
    }
    res.status(200).json({
        message: 'cart deleted successfully',
        success: true,
    });
});
