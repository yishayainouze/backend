"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersControllers_1 = require("../controllers/usersControllers");
const router = express_1.default.Router();
router.get("/", usersControllers_1.handleGetUsers);
router.get("/:id", usersControllers_1.handleGetUser);
router.post("/", usersControllers_1.handleUserRegistration);
router.put("/:id", usersControllers_1.handleEditUser);
router.delete("/:id", usersControllers_1.handleDeleteUser);
router.post("/login", usersControllers_1.handleLogin);
router.post("/add-product/:id", usersControllers_1.handleAddProductToUser);
exports.default = router;
