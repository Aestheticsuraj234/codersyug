import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
const generateErrorResponse = (message: string, status: number) => {
  return new NextResponse(JSON.stringify({ message }), {
    status,
  });
};

// GET SINGLE POST
export const GET = async (req: Request, { params }: any) => {
  try {
    const { slug } = params;
    const profile = await currentProfile();

    if (!profile) {
      return generateErrorResponse("Unauthorized", 401);
    }

    // Fetch the blog without any user authorization check
    const blog = await db.blog.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        liked: true,
        comments: {
          include: {
            commenter: true,
          }
        }
      }
    });

    if (!blog) {
      return generateErrorResponse("Not found", 404);
    }
    // Create a VisitedBlog record and associate it with the logged-in user and the visited blog but not duplicate

    const visitedBlog = await db.visitedBlog.findFirst({
      where: {
        blogId: blog?.id,
        visitorId: profile?.id,
      },
    });

    if (!visitedBlog) {
      await db.visitedBlog.create({
        data: {
          blogId: blog.id,
          visitorId: profile.id,
        },
      });
    }
  

    return new NextResponse(JSON.stringify(blog), {
      status: 200,
    });
  } catch (error) {
    return generateErrorResponse(`Blog fetching causing ${error} `, 500);
  }
};
