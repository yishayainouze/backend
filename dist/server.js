"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("./logger/morgan"));
const cors_1 = __importDefault(require("./cors/cors"));
const chalk_1 = __importDefault(require("chalk"));
const router_1 = __importDefault(require("./router/router"));
const initialDataService_1 = require("./initialData/initialDataService");
const connectToDB_1 = __importDefault(require("./mongoAccess/connectToDB"));
const app = (0, express_1.default)();
const PORT = 8181;
const run = async () => {
    try {
        await (0, connectToDB_1.default)();
        app.listen(PORT, () => {
            console.log(chalk_1.default.blueBright(`Server listening on port: ${PORT}`));
            (0, initialDataService_1.generateInitialUsers)()
                .then(() => console.log(chalk_1.default.magentaBright("Initial Users Created!")))
                .catch((error) => console.log(error));
        });
        app.use(morgan_1.default);
        app.use(cors_1.default);
        app.use(express_1.default.json());
        app.use(router_1.default);
    }
    catch (error) {
        console.log("Failed to connect to server", error);
    }
};
run();
