"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usersRoutes_1 = __importDefault(require("../users/routes/usersRoutes"));
router.use("/api/users", usersRoutes_1.default);
router.use("*", (req, res) => res.status(404).send("Page not found!"));
exports.default = router;
