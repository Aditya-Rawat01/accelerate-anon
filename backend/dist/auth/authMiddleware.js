"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        try {
            const tokenDecoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.id = tokenDecoded.id;
            next();
        }
        catch (error) {
            res.status(403).json({
                "msg": "Invalid token"
            });
        }
    }
    else {
        res.status(411).json({
            "msg": "Token required"
        });
    }
}
