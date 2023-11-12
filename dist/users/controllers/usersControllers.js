"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddProductToUser = exports.handleLogin = exports.handleDeleteUser = exports.handleEditUser = exports.handleUserRegistration = exports.handleGetUser = exports.handleGetUsers = void 0;
const usersApiService_1 = require("../services/usersApiService");
const handleErrors_1 = require("../../utils/handleErrors");
const userValidation_1 = __importDefault(require("../models/joi/userValidation"));
const handleGetUsers = async (req, res) => {
    try {
        const users = await (0, usersApiService_1.getUsers)();
        return res.send(users);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleGetUsers = handleGetUsers;
const handleGetUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, usersApiService_1.getUser)(id);
        return res.send(user);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleGetUser = handleGetUser;
const handleUserRegistration = async (req, res) => {
    try {
        const user = req.body;
        const { error } = (0, userValidation_1.default)(user);
        if (error?.details[0].message)
            throw new Error(error?.details[0].message);
        const userFromDB = await (0, usersApiService_1.register)(user);
        return res.status(201).send(userFromDB);
    }
    catch (error) {
        if (error instanceof Error)
            (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleUserRegistration = handleUserRegistration;
const handleEditUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        const { error } = (0, userValidation_1.default)(user);
        if (error?.details[0].message)
            throw new Error(error?.details[0].message);
        const userFromDB = await (0, usersApiService_1.editUser)(id, user);
        return res.send(userFromDB);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleEditUser = handleEditUser;
const handleDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, usersApiService_1.deleteUser)(id);
        return res.json(user);
    }
    catch (error) {
        console.log("controller");
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleDeleteUser = handleDeleteUser;
const handleLogin = async (req, res) => {
    try {
        const userFromClient = req.body;
        const { error } = (0, userValidation_1.default)(userFromClient);
        if (error?.details[0].message)
            throw new Error(error?.details[0].message);
        const token = await (0, usersApiService_1.login)(userFromClient);
        return res.send(token);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error, 401);
    }
};
exports.handleLogin = handleLogin;
const handleAddProductToUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { product } = req.query;
        const userWithProduct = await (0, usersApiService_1.addProductToUser)(id, String(product));
        if (!userWithProduct)
            throw new Error("Could not add this product to this user");
        return res.send(userWithProduct);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleAddProductToUser = handleAddProductToUser;
