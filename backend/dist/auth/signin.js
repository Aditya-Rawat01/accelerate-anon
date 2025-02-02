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
exports.signinRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodSchema_1 = require("../zodSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
exports.signinRouter = express_1.default.Router();
function signinMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const validRes = zodSchema_1.userSignin.safeParse({ email, password });
        if (!validRes.success) {
            res.status(411).json({
                "msg": validRes.error.issues
            });
        }
        else {
            try {
                const userExists = yield __1.prisma.user.findFirst({
                    where: {
                        email
                    }
                });
                if (userExists && userExists.password === password) {
                    const id = userExists.id;
                    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: '7d'
                    });
                    req.id = id;
                    req.token = token;
                    req.receiveEmail = userExists.receiveEmail;
                    next();
                }
                else if ((userExists === null || userExists === void 0 ? void 0 : userExists.password) !== password && userExists) {
                    res.status(403).json({
                        "msg": "Wrong password! Try Again"
                    });
                }
                else {
                    res.status(404).json({
                        "msg": "Email don't exists. Try signing up"
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    "msg": "Server error."
                });
            }
        }
    });
}
exports.signinRouter.post("/", signinMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.receiveEmail) {
        yield __1.prisma.user.update({
            where: {
                id: parseInt(req.id)
            },
            data: {
                receiveEmail: true
            }
        });
    }
    res.json({
        "msg": "Signed in successfully",
        "token": req.token
    });
}));
