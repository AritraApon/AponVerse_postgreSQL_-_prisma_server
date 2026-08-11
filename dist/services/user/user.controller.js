"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const user_service_1 = require("./user.service");
const getProfile = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user = await (0, user_service_1.getMyProfile)(req.user.userId);
        return res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve profile",
        });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { name, bio, profileImage } = req.body;
        const user = await (0, user_service_1.updateMyProfile)(req.user.userId, {
            name,
            bio,
            profileImage,
        });
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update profile",
        });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=user.controller.js.map