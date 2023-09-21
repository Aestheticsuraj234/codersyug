import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const generateErrorResponse = (message: string, status: number) => {
  return new NextResponse(JSON.stringify({ message }), {
    status,
  });
};

// GET SINGLE POST
export const GET = async (req: Request, { params }: any) => {
  try {
    const { slug } = params;

    // Fetch the blog without any user authorization check
    const blog = await db.blog.findUnique({
      where: {
        slug,
      },
      include:{
        author: true,
        liked: true,
        comments:{
          include:{
            commenter: true,
          }
        }
      }
    });

    if (!blog) {
      return generateErrorResponse("Not found", 404);
    }

    return new NextResponse(JSON.stringify(blog), {
      status: 200,
    });
  } catch (error) {
    return generateErrorResponse(`Blog fetching causing ${error} `, 500);
  }
};
