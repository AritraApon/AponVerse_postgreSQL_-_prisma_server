import { prisma } from "../../lib/prisma";

export const toggleLike = async (
  userId: string,
  postId: string
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

  const existingReaction = await prisma.reaction.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingReaction) {
    await prisma.reaction.delete({
      where: {
        id: existingReaction.id,
      },
    });

    return {
      liked: false,
      message: "Post unliked",
    };
  }

  await prisma.reaction.create({
    data: {
      userId,
      postId,
      type: "LIKE",
    },
  });

  return {
    liked: true,
    message: "Post liked",
  };
};


export const getPostReactions = async (
  postId: string,
  userId?: string
) => {
  const likeCount = await prisma.reaction.count({
    where: {
      postId,
      type: "LIKE",
    },
  });

  let likedByMe = false;

  if (userId) {
    const reaction = await prisma.reaction.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    likedByMe = !!reaction;
  }

  return {
    likeCount,
    likedByMe,
  };
};