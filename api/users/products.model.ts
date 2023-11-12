import mongoose, { Document, Schema } from 'mongoose';

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

const cartItemSchema = new Schema<CartItem>({
    product_id: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
}, { _id: false });

const userSchema = new Schema<User>({
    user_id: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    cart: [cartItemSchema],
});
const UserModel = mongoose.model<User>('User', userSchema, 'users');

export default UserModel;
