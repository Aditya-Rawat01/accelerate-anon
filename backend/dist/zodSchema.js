"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardSchema = exports.updateUserSchema = exports.activitySchema = exports.userSignin = exports.userSignup = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSignup = zod_1.default.object({
    username: zod_1.default.string().min(3, "Username must be greater than or equal to 3 characters"),
    email: zod_1.default.string().email("Provide valid Email").transform((val) => val.toLowerCase()),
    password: zod_1.default.string().min(5, "Provide 5 or more characters")
});
exports.userSignin = zod_1.default.object({
    email: zod_1.default.string().email("Provide valid Email").transform((val) => val.toLowerCase()),
    password: zod_1.default.string().min(5, "Provide 5 or more characters")
});
const workingDay = zod_1.default.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
exports.activitySchema = zod_1.default.object({
    activity: zod_1.default.string(),
    totalDays: zod_1.default.number(),
    workingDays: zod_1.default.array(workingDay)
});
exports.updateUserSchema = zod_1.default.object({
    workingDays: zod_1.default.array(workingDay),
    activity: zod_1.default.string(),
    totalDays: zod_1.default.number(),
    progress: zod_1.default.number()
});
exports.dashboardSchema = zod_1.default.object({
    streak: zod_1.default.number()
});
