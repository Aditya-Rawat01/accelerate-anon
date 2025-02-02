"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodSchema_1 = require("../zodSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
exports.signupRouter = express_1.default.Router();
function signupMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        const validRes = zodSchema_1.userSignup.safeParse({ username, email, password });
        if (!validRes.success) {
            res.status(411).json({
                "msg": validRes.error.issues
            });
        }
        else {
            try {
                const newUser = yield __1.prisma.user.create({
                    data: {
                        username,
                        email,
                        password
                    }
                });
                req.id = newUser.id;
                const token = jsonwebtoken_1.default.sign({ id: req.id }, process.env.JWT_SECRET, {
                    expiresIn: '7d'
                });
                req.token = token;
                next();
            }
            catch (error) {
                res.status(409).json({
                    "msg": "Email exists. Try signing in"
                });
            }
        }
    });
}
exports.signupRouter.post("/", signupMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const yesterday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1));
        const dash = yield __1.prisma.dashboard.create({
            data: {
                streak: 0,
                userId: parseInt(req.id),
                streakDate: yesterday
            }
        });
        res.json({
            "token": req.token,
            "dashboard": dash
        });
    }
    catch (error) {
        res.status(500).json({
            "msg": "Error while signing up.Try again"
        });
    }
}));
/// there should be delete account api which delete the user, dashboard, activity adn dont send emails to them
