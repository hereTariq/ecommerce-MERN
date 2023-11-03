import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'password is required'],
            trim: true,
        },
        phone_no: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Active', 'InActive', 'Blocked'],
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        profile_photo: String,
        terms_and_conditions: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.findByEmail = async function (email) {
    return await this.findOne({ email });
};

userSchema.methods.generateToken = function () {
    const payload = {
        userId: this._id,
        email: this.email,
    };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
};

const userModel = model('User', userSchema);

export default userModel;
