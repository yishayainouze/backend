import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

interface CartItem {
    product_id: number;
    quantity: number;
    price: string;
    image: string;
}

export interface User extends Document {
    user_id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    address: string;
    cart: CartItem[];
}

// סכמת Mongoose לפריט בעגלה
const cartItemSchema = new Schema<CartItem>({
    product_id: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
}, { _id: false });

// סכמת Mongoose למשתמש
const userSchema = new Schema<User>({
    user_id: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    cart: [cartItemSchema],
});

// יצירת מודל משתמש
const UserModel = mongoose.model<User>('User', userSchema, 'users');

// סכמת Joi לפריט בעגלה
const cartItemJoiSchema = Joi.object({
    product_id: Joi.number().required(),
    quantity: Joi.number().required(),
    price: Joi.string().required(),
    image: Joi.string().required(),
});

// סכמת Joi למשתמש
const userJoiSchema = Joi.object({
    user_id: Joi.number().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    cart: Joi.array().items(cartItemJoiSchema),
});

export { UserModel, userJoiSchema };
