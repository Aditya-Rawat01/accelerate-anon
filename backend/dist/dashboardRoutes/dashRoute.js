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
exports.dashboardRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../auth/authMiddleware");
const __1 = require("..");
const zodSchema_1 = require("../zodSchema");
exports.dashboardRouter = express_1.default.Router();
exports.dashboardRouter.get("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDash = yield __1.prisma.dashboard.findFirst({
            where: {
                userId: parseInt(req.id)
            },
            select: {
                user: true,
                completedActivities: true,
                streak: true,
                streakDate: true
            }
        });
        res.json({
            "msg": userDash
        });
    }
    catch (error) {
        res.status(500).json({
            "msg": "Server Error/ User doesn't exists"
        });
    }
}));
exports.dashboardRouter.post("/update", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { streakDate } = req.body;
    const parsedSchema = zodSchema_1.dashboardSchema.safeParse({ streakDate });
    if (!parsedSchema.success) {
        res.status(403).json({
            "msg": "Invalid entries"
        });
    }
    else { // streak can be updated by using lastUpdatedAt (maybe)
        try {
            const dash = yield __1.prisma.dashboard.update({
                where: {
                    userId: parseInt(req.id)
                },
                data: {
                    streakDate: streakDate
                }
            });
            res.json({
                "msg": dash
            });
        }
        catch (error) {
            res.json({
                "msg": "Error occured while fetching dashboard"
            });
        }
    }
}));
exports.dashboardRouter.post("/unsubscribeEmail", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield __1.prisma.user.update({
            where: {
                id: parseInt(req.id)
            },
            data: {
                receiveEmail: false
            }
        });
        res.json({
            "msg": "Unsubscribed Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            "msg": "Server Error"
        });
    }
}));
