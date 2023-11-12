// products.model.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface Product extends Document {
    id: number;
    name: string;
    category: string;
    commonAttributes: {
        price: number;
        manufacturer: string;
        description: string;
        imageURL: string;
    };
    categoryAttributes: {
        resolution: string;
        screen_size: string;
    };
    quantity: number; 
}

const productSchema = new Schema<Product>({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    commonAttributes: {
        price: { type: Number, required: true },
        manufacturer: { type: String, required: true },
        description: { type: String, required: true },
        imageURL: { type: String, required: true },
    },
    categoryAttributes: {
        resolution: { type: String, required: true },
        screen_size: { type: String, required: true },
    },
    quantity: { type: Number, default: 0 }, // Add this line
});

const ProductModel = mongoose.model<Product>('product', productSchema,'products');

export default ProductModel;
