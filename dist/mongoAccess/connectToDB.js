"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BASE_CONNECTION = "mongodb://localhost:27017";
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(BASE_CONNECTION);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
exports.default = connectToDatabase;
