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