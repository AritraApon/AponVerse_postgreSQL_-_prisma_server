import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { createPost } from "./post.service";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title, description, image, categoryId } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const post = await createPost(
      title,
      description,
      image,
      req.user.userId,
      categoryId
    );

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};