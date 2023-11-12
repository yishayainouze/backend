"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.getUserById = exports.updateUser = exports.register = exports.getAllUsers = void 0;
const userModel_1 = require("../../mongoAccess/userModel");
const getAllUsers = async () => {
    try {
        const users = await userModel_1.UserModel.find({}).exec();
        console.log("I work with mongoose to get the users");
        return users;
    }
    catch (error) {
        const catchError = error;
        throw new Error(catchError.message);
    }
};
exports.getAllUsers = getAllUsers;
const register = async (userData) => {
    console.log("Registering here I am");
    try {
        const newUser = new userModel_1.UserModel(userData);
        const savedUser = await newUser.save();
        return savedUser;
    }
    catch (error) {
        throw error;
    }
};
exports.register = register;
const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await userModel_1.UserModel.findByIdAndUpdate(userId, userData, {
            new: true,
        }).exec();
        console.log("updated user", updatedUser);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUser = updateUser;
const getUserById = async (userId) => {
    try {
        const user = await userModel_1.UserModel.findById(userId).exec();
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.getUserById = getUserById;
const deleteUserById = async (userId) => {
    try {
        const deletedUser = await userModel_1.UserModel.findByIdAndDelete(userId).exec();
        if (!deletedUser)
            throw new Error(`User ${userId} is not found`);
        return deletedUser;
    }
    catch (error) {
        console.log("dal");
        throw error;
    }
};
exports.deleteUserById = deleteUserById;
