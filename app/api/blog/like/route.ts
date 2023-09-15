import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

const generateErrorResponse = (message: string, status: number) => {
  return new NextResponse(JSON.stringify({ message }), {
    status,
  });
};

export const POST = async (req: Request) => {
  try {
    const { blogId } = await req.json();

    // Validate blogId
    if (!blogId) {
      return generateErrorResponse("Invalid blogId", 400);
    }

    const profile = await currentProfile();

    if (!profile) {
      return generateErrorResponse("Unauthorized", 401);
    }

    // Fetch the blog to ensure it exists
    const blog = await db.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return generateErrorResponse("Blog not found", 404);
    }

    const existingLike = await db.likes.findFirst({
      where: {
        liker: {
          userId: profile.userId,
        },
        blogId: blogId,
      },
    });

    if (existingLike) {
      await db.likes.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Decrement the likes of the blog
      const updatedBlog = await db.blog.update({
        where: { id: blogId },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      return new NextResponse(JSON.stringify(updatedBlog), {
        status: 200,
      });
    } else {
      // Increment the likes of the blog
      const updatedBlog = await db.blog.update({
        where: { id: blogId },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      // Create a new like with the associated blog
      await db.likes.create({
        data: {
          liker: {
            connect: { userId: profile.userId },
          },
          Blog: { connect: { id: blogId } },
        },
      });

      return new NextResponse(JSON.stringify(updatedBlog), {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return generateErrorResponse("Internal server error", 500);
  }
};


