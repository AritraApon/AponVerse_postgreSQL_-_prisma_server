import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";

import {
  toggleLike,
  getPostReactions,
} from "./reaction.service";


export const toggle = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { postId } = req.params;

    const result = await toggleLike(
      req.user.userId,
      postId as string
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        liked: result.liked,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to toggle like",
    });
  }
};


export const getReactions = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { postId } = req.params;

    const result = await getPostReactions(
      postId as string,
      req.user?.userId
    );

    return res.status(200).json({
      success: true,
      message: "Reactions retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve reactions",
    });
  }
};