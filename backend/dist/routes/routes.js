"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../auth/authMiddleware");
exports.routesRouter = express_1.default.Router();
exports.routesRouter.get("/", authMiddleware_1.authMiddleware, (req, res) => {
    res.json({
        "msg": "hi"
    });
});
exports.routesRouter.post("/activity", authMiddleware_1.authMiddleware, (req, res) => {
    res.json({
        "msg": "done"
    });
});
exports.routesRouter.post("/progress/:activityId", authMiddleware_1.authMiddleware, (req, res) => {
    //logic for searching activityId and checking if the req.id  is actually it's owner
    res.json({
        "msg": "hi"
    });
});
