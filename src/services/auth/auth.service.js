"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (name, email, password) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};
exports.registerUser = registerUser;
//login User
const loginUser = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    };
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.service.js.map