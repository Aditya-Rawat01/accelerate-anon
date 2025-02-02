"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./auth/auth");
const routes_1 = require("./userRoutes/routes");
const client_1 = require("@prisma/client");
const dashRoute_1 = require("./dashboardRoutes/dashRoute");
const emailScheduler_1 = require("./automatedEmails/emailScheduler");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const app = (0, express_1.default)();
//----------------------------- Uncomment the cron job function-------
exports.prisma = new client_1.PrismaClient();
// might add these ---
// const corsOptions = {
//     origin: ['http://trusted-origin.com', 'http://another-trusted.com', null], // Add specific origins and null for Postman
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Limit allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Limit allowed headers
//   };
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.authRouter);
app.use("/user", routes_1.activityRouter);
app.use("/dash", dashRoute_1.dashboardRouter);
(0, emailScheduler_1.emailScheduler)(); // cron job + nodemailer logic
app.listen(process.env.PORT || 3000);
// signup (done)
//sign in  (done)
//get all info (done)
//post new info (done)
//update info (done)
//delete new info (done)
