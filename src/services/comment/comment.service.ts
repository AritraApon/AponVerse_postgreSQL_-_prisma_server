import { prisma } from "../../lib/prisma";

export const createComment = async (
  userId: string,
  postId: string,
  content: string
) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      isDeleted: false,
      status: "PUBLISHED",
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return prisma.comment.create({
    data: {
      content,
      authorId: userId,
      postId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
    },
  });
};


export const getPostComments = async (postId: string) => {
  return prisma.comment.findMany({
    where: {
      postId,
      isDeleted: false,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


export const deleteComment = async (
  commentId: string,
  userId: string
) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId: userId,
      isDeleted: false,
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  return prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      isDeleted: true,
    },
  });
};