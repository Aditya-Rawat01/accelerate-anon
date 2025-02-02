"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = require("./signup");
const signin_1 = require("./signin");
exports.authRouter = express_1.default.Router();
exports.authRouter.use("/signup", signup_1.signupRouter);
exports.authRouter.use("/signin", signin_1.signinRouter);
