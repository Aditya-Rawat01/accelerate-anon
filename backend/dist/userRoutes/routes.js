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
exports.activityRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../auth/authMiddleware");
const __1 = require("..");
const zodSchema_1 = require("../zodSchema");
exports.activityRouter = express_1.default.Router();
exports.activityRouter.get("/activity", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield __1.prisma.user.findFirst({
            where: {
                id: parseInt(req.id)
            },
            include: {
                activity: true
            }
        });
        if (!user) {
            res.status(403).json({
                "msg": "User don't exists"
            });
        }
        res.json({
            "msg": user === null || user === void 0 ? void 0 : user.activity
        });
    }
    catch (error) {
        res.json({
            "msg": "Db crashed.  Refresh again"
        });
    }
}));
exports.activityRouter.post("/activity", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { activity, totalDays, workingDays } = req.body;
    const validSchema = zodSchema_1.activitySchema.safeParse({
        activity,
        totalDays,
        workingDays
    });
    if (validSchema.success) {
        try {
            yield __1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
                const activityCount = yield prisma.activity.count({
                    where: {
                        userId: parseInt(req.id),
                        progress: {
                            not: 100
                        }
                    },
                });
                if (activityCount === 3) {
                    res.status(403).json({
                        "msg": "Focus on the pending 3 tasks first"
                    });
                    return;
                }
                else {
                    try {
                        yield prisma.activity.create({
                            data: {
                                activity: activity,
                                progress: 0.00,
                                totalDays: totalDays,
                                currentDay: 0,
                                workingDays: workingDays,
                                userId: parseInt(req.id)
                            }
                        });
                        res.json({
                            "msg": "New activity added"
                        });
                    }
                    catch (error) {
                        res.status(500).json({
                            "msg": "Query crashed. Retry again"
                        });
                        return;
                    }
                }
            }));
        }
        catch (error) {
            res.status(500).json({
                "msg": "Server Error"
            });
        }
    }
    else {
        res.status(403).json({
            "msg": "Invalid Entries. Please provide correct formats"
        });
    }
}));
exports.activityRouter.post("/progress/:activityId", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activityId = req.params.activityId;
    const progress = parseFloat(req.body.progress);
    const lastUpdatedAt = new Date(req.body.date).setHours(0, 0, 0, 0);
    const todayDate = new Date();
    const msDate = new Date().setHours(0, 0, 0, 0);
    const ms = 24 * 60 * 60 * 1000;
    const updateValues = { streakDate: todayDate };
    if (progress <= 100 && progress > 0) {
        if (msDate - lastUpdatedAt < 1) {
            try {
                yield __1.prisma.activity.update({
                    where: {
                        id: parseInt(activityId),
                        userId: parseInt(req.id)
                    },
                    data: {
                        progress: progress,
                        currentDay: { increment: 1 }
                    }
                });
                res.json({
                    "msg": "Progressed! Keep it up"
                });
            }
            catch (error) {
                res.status(500).json({
                    "msg": "Server Error"
                });
            }
        }
        else {
            if ((msDate - lastUpdatedAt) / ms === 1) {
                updateValues.streak = {
                    increment: 1
                };
            }
            else {
                updateValues.streak = 1;
            }
            try {
                yield __1.prisma.dashboard.update({
                    where: {
                        userId: parseInt(req.id)
                    },
                    data: updateValues
                });
                yield __1.prisma.activity.update({
                    where: {
                        id: parseInt(activityId),
                        userId: parseInt(req.id)
                    },
                    data: {
                        progress: progress,
                        currentDay: { increment: 1 },
                        lastUpdatedAt: todayDate
                    }
                });
                res.json({
                    "msg": "Progressed! Keep it up"
                });
            }
            catch (error) {
                res.status(500).json({
                    "msg": "Server error"
                });
            }
        }
    }
    else {
        res.status(403).json({
            "msg": "Invalid progress"
        });
    }
}));
exports.activityRouter.post("/completed/:activityId", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activityId = req.params.activityId;
    try {
        yield __1.prisma.activity.delete({
            where: {
                id: parseInt(activityId),
                userId: parseInt(req.id)
            }
        });
        yield __1.prisma.dashboard.update({
            where: {
                userId: parseInt(req.id)
            },
            data: {
                completedActivities: {
                    increment: 1
                }
            }
        });
        res.json({
            "msg": "Congratulations, activity completed"
        });
    }
    catch (error) {
        res.status(500).json({
            "msg": "Error occured. Try again"
        });
    }
}));
exports.activityRouter.post("/update/:activityId", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activityId = req.params.activityId;
    const { workingDays, activity, totalDays, progress } = req.body;
    const parsed = zodSchema_1.updateUserSchema.safeParse({ workingDays, activity, totalDays, progress });
    if (!parsed.success) {
        res.status(411).json({
            "msg": "Invalid Entries. Please provide correct formats"
        });
        return;
    }
    try { //    Object.keys(dataToUpdate).length==0 or activity id can be wrong
        yield __1.prisma.activity.update({
            where: {
                id: parseInt(activityId),
                userId: parseInt(req.id)
            },
            data: {
                workingDays,
                activity,
                totalDays,
                progress
            }
        });
        res.json({
            "msg": "Values Updated"
        });
    }
    catch (_a) {
        res.json({
            "msg": "Nothing to update/ Wrong activityId"
        });
    }
}));
exports.activityRouter.delete("/delete/:activityId", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activityId = req.params.activityId;
    try {
        const ans = yield __1.prisma.activity.delete({
            where: {
                id: parseInt(activityId),
                userId: parseInt(req.id)
            }
        });
        res.json({
            "msg": "Activity deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            "msg": "Server Error"
        });
    }
}));
