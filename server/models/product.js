import { model, Schema } from 'mongoose';

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title of product is required'],
        },
        price: {
            type: Number,
            required: [true, 'price of product is required'],
        },
        image: {
            type: String,
            required: [true, 'image of product is required'],
        },
        description: {
            type: String,
            // required:[true,"description of product is required"]
        },
    },
    { timestamps: true }
);

const productModel = model('Product', productSchema);
export default productModel;
