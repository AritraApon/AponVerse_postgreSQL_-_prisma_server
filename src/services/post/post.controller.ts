import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "./post.service";

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


// Get all Post

export const getAll = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const posts = await getAllPosts();

    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve posts",
    });
  }
};

// Get singel post details page

export const getSingle = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const post = await getPostById(id as string);

    return res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
};

// Update post
export const update = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { title, description, image, categoryId } = req.body;

    const post = await updatePost(
      id as string,
      req.user.userId,
      {
        title,
        description,
        image,
        categoryId,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to update post";

    const statusCode =
      message.includes("not allowed") ? 403 : 404;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};


// delete controller
export const remove = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await deletePost(
      id as string,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete post";

    const statusCode =
      message.includes("not allowed") ? 403 : 404;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};