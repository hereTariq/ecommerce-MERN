import productModel from '../models/product.js';
import cartModel from '../models/cart.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';

export const createProduct = catchAsyncError(async (req, res, next) => {
    const newProduct = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        message: 'product created successfully',
        product: newProduct,
    });
});

export const getProducts = catchAsyncError(async (req, res, next) => {
    const products = await productModel.find();
    if (products.length === 0) {
        return next(new ErrorHandler(404, 'NO PRODUCTS'));
    }

    res.status(200).json({
        success: true,
        message: 'products fetched successfully',
        products,
    });
});

export const getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.productId);
    if (!product) {
        return next(new ErrorHandler(404, 'NO PRODUCT'));
    }
    res.status(200).json({
        success: true,
        message: 'product fetched successfully',
        product,
    });
});
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findByIdAndDelete(req.params.productId);
    if (!product) {
        return next(new ErrorHandler(404, 'NO PRODUCT'));
    }
    res.status(200).json({
        success: true,
        message: 'product deleted successfully',
        product,
    });
});
export const updateProduct = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
    );
    if (!product) {
        return next(new ErrorHandler(404, 'NO PRODUCT'));
    }
    res.status(200).json({
        success: true,
        message: 'product updated successfully',
        product,
    });
});
