"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInitialUsers = void 0;
const usersApiService_1 = require("../users/services/usersApiService");
const mongoose_dal_1 = require("../users/dal/mongoose.dal");
const chalk_1 = __importDefault(require("chalk"));
const data = {
    users: [
        { email: "regular@gmail.com", password: "Aa1234!" },
        { email: "business@gmail.com", password: "Aa1234!" },
        { email: "admin@gmail.com", password: "Aa1234!" },
    ],
};
const generateInitialUsers = async () => {
    try {
        const usersInDB = await (0, usersApiService_1.getUsers)();
        if (Array.isArray(usersInDB) && usersInDB.length > 0)
            return null;
        const users = [];
        for (const user of data.users) {
            const userType = user;
            try {
                const userInDB = await (0, mongoose_dal_1.register)(userType);
                users.push(userInDB);
            }
            catch (error) {
                console.log(chalk_1.default.redBright("Could not register this user"));
            }
        }
        Promise.resolve(users);
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        Promise.reject(error);
    }
};
exports.generateInitialUsers = generateInitialUsers;
