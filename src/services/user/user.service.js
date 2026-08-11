"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = exports.getMyProfile = void 0;
const prisma_1 = require("../../lib/prisma");
const getMyProfile = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            profileImage: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
exports.getMyProfile = getMyProfile;
const updateMyProfile = async (userId, data) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const updatedUser = await prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            profileImage: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return updatedUser;
};
exports.updateMyProfile = updateMyProfile;
//# sourceMappingURL=user.service.js.map