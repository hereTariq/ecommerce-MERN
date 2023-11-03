import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                min: 1,
            },
            total: Number,
        },
    ],
    totalQuantity: Number,
    totalPrice: Number,
});

const orderModel = model('Order', orderSchema);
export default orderModel;
