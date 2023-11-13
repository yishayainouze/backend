// products.model.ts
import Joi from 'joi';
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
    numberOfClicks: number; // Add this line
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
    quantity: { type: Number, default: 0 },
    numberOfClicks: { type: Number, default: 0 }, // Add this line
});

const ProductModel = mongoose.model<Product>('product', productSchema, 'products');
const productJoiSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),
    commonAttributes: Joi.object({
        price: Joi.number().required(),
        manufacturer: Joi.string().required(),
        description: Joi.string().required(),
        imageURL: Joi.string().required(),
    }).required(),
    categoryAttributes: Joi.object({
        resolution: Joi.string().required(),
        screen_size: Joi.string().required(),
    }).required(),
    quantity: Joi.number().min(0).default(0),
    numberOfClicks: Joi.number().min(0).default(0),
});

export { ProductModel, productJoiSchema };
