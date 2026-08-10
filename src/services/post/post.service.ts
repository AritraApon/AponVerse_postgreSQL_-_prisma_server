import { prisma } from "../../lib/prisma";

export const createPost = async (
  title: string,
  description: string,
  image: string | undefined,
  authorId: string,
  categoryId?: string
) => {
  const post = await prisma.post.create({
    data: {
      title,
      description,
      image,
      authorId,
      categoryId,
    },
  });

  return post;
};


// all data get from prisma
export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    where: {
      isDeleted: false,
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          bio: true,
          profileImage: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
};

//details page data

export const getPostById = async (id: string) => {
  const post = await prisma.post.findFirst({
    where: {
      id,
      isDeleted: false,
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          bio: true,
          profileImage: true,
        },
      },
      category: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

// update your post
export const updatePost = async (
  postId: string,
  userId: string,
  data: {
    title?: string;
    description?: string;
    image?: string;
    categoryId?: string;
  }
) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      isDeleted: false,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== userId) {
    throw new Error("You are not allowed to update this post");
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data,
  });

  return updatedPost;
};


//delete your post
export const deletePost = async (
  postId: string,
  userId: string
) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      isDeleted: false,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== userId) {
    throw new Error("You are not allowed to delete this post");
  }

  const deletedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      isDeleted: true,
    },
  });

  return deletedPost;
};