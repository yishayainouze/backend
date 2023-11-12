"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromDummy = void 0;
const axios_1 = __importDefault(require("axios"));
const DB_URL = "https://dummyjson.com/products";
const getDataFromDummy = async () => {
    try {
        const data = await axios_1.default.get(DB_URL);
        return data;
    }
    catch (error) {
        return Promise.reject(null);
    }
};
exports.getDataFromDummy = getDataFromDummy;
