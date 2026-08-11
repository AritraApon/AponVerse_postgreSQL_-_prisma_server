"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const auth_service_2 = require("./auth.service");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }
        const user = await (0, auth_service_1.registerUser)(name, email, password);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.register = register;
//login User :
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        const result = await (0, auth_service_2.loginUser)(email, password);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Login failed",
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map