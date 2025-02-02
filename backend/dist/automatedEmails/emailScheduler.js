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
exports.emailScheduler = emailScheduler;
const node_cron_1 = __importDefault(require("node-cron"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const __1 = require("..");
const mailSelector_1 = require("./mailSelector");
function emailScheduler() {
    node_cron_1.default.schedule("* * * * *", () => __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield __1.prisma.user.findMany({
                select: {
                    activity: true,
                    username: true,
                    email: true,
                    receiveEmail: true
                }
            });
            if (!users || users.length === 0) {
                console.log("No users found");
                return;
            }
            // choosing all people at once
            // Add more better logic for selecting users
            for (let i = 0; i < users.length; i++) {
                const randomUser = users[i];
                if (randomUser.receiveEmail === false) {
                    return;
                }
                if (randomUser.activity.length === 0) {
                    console.log(`No activity found for user: ${randomUser.username}`);
                    return;
                }
                const randomActivity = randomUser.activity[Math.floor((Math.random() * randomUser.activity.length))].activity;
                const text = (0, mailSelector_1.MailSelector)(randomUser.username, randomActivity);
                /// add more motivation email templates (sort of done)
                MailSender(randomUser.email, text);
            }
        }
        catch (error) {
            console.log("Error in email scheduler function");
        }
    }));
}
function MailSender(email, activity) {
    const transporter = nodemailer_1.default.createTransport({
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        }
    });
    const emailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: "Accelerate Anon",
        html: activity
    };
    transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
            console.log("Error occured while sending mails: ", err.message);
        }
        else {
            console.log("Mail sent successfully: ", info.response);
        }
    });
}
