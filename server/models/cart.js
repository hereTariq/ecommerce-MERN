import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
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
    totalProducts: Number,
    totalPrice: Number,
});

const cartModel = model('Cart', cartSchema);
export default cartModel;
