"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToUser = exports.login = exports.deleteUser = exports.editUser = exports.register = exports.getUser = exports.getUsers = void 0;
const bcrypt_1 = require("../helpers/bcrypt");
const chalk_1 = __importDefault(require("chalk"));
const dummyjson_1 = require("../../dataAccess/dummyjson");
const mongoose_dal_1 = require("../dal/mongoose.dal");
const getUsers = async () => {
    try {
        const users = await (0, mongoose_dal_1.getAllUsers)();
        if (!users)
            throw new Error("no users in the database");
        return users;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return Promise.reject(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (userId) => {
    try {
        const user = await (0, mongoose_dal_1.getUserById)(userId);
        if (user instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        return user;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return Promise.reject(error);
    }
};
exports.getUser = getUser;
const register = async (user) => {
    try {
        const users = await (0, mongoose_dal_1.getAllUsers)();
        if (users instanceof Error)
            throw new Error("Oops... Could not get the users from the Database");
        const userRegistered = users.find((u) => u.email === user.email);
        if (userRegistered)
            throw new Error("This user is already registered!");
        user.password = (0, bcrypt_1.generateUserPassword)(user.password);
        const savedUser = await (0, mongoose_dal_1.register)(user);
        return savedUser;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return Promise.reject(error);
    }
};
exports.register = register;
const editUser = async (userId, userForUpdate) => {
    try {
        const updatedUser = await (0, mongoose_dal_1.updateUser)(userId, userForUpdate);
        if (!updatedUser)
            throw new Error("Oops... Could not update");
        return updatedUser;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        return Promise.reject(error);
    }
};
exports.editUser = editUser;
const deleteUser = async (userId) => {
    try {
        const deletedUserReturn = await (0, mongoose_dal_1.deleteUserById)(userId);
        if (!deletedUserReturn)
            throw new Error("Oops... Could not delete");
        return deletedUserReturn;
    }
    catch (error) {
        console.log("service");
        console.log(chalk_1.default.redBright(error));
        return Promise.reject(error);
    }
};
exports.deleteUser = deleteUser;
const login = async (userFromClient) => {
    try {
        const users = (await (0, mongoose_dal_1.getAllUsers)());
        if (!users)
            throw new Error("Oops... Could not get the users from the Database");
        const userInDB = users.find((user) => userFromClient.email === user.email);
        console.log(userInDB);
        if (!userInDB)
            throw new Error("The email or password is incorrect!");
        if (!(0, bcrypt_1.comparePassword)(userFromClient.password, userInDB.password))
            throw new Error("The email or password is incorrect!");
        return "You are logged in!";
    }
    catch (error) {
        console.log("service");
        console.log(chalk_1.default.redBright(error));
        return Promise.reject(error);
    }
};
exports.login = login;
const addProductToUser = async (userId, productFromClient) => {
    try {
        const user = await (0, mongoose_dal_1.getUserById)(userId);
        if (!user)
            throw new Error("Could not find this user!");
        console.log(user);
        const data = await (0, dummyjson_1.getDataFromDummy)();
        if (!data?.data)
            throw new Error("Could not get the data!");
        const { data: dataFromDummy } = data;
        const productFromDB = dataFromDummy.products.find((product) => typeof product.title === "string" &&
            product.title
                .toLowerCase()
                .trim()
                .includes(productFromClient.toLowerCase().trim()));
        if (!productFromDB)
            throw new Error("Could not found this product");
        console.log(productFromDB);
        console.log(user);
        user["product"] = productFromDB;
        console.log(user);
        console.log(user.product);
        const updatedUser = await (0, mongoose_dal_1.updateUser)(userId, user);
        if (!updatedUser)
            throw new Error("Could not add this user database");
        console.log(updatedUser);
        return updatedUser;
    }
    catch (error) {
        if (error && typeof error === "object" && "message" in error)
            console.log(chalk_1.default.redBright(error.message));
        return Promise.reject(error);
    }
};
exports.addProductToUser = addProductToUser;
