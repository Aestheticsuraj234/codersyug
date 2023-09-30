import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async ({
  params,
}: any) => {
  try {
    const { blogId } = params;
    const blogIdInt = Number(blogId); // Convert blogId to an integer
    // Fetch the currently logged-in user's profile
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        {
          status: 401,
        }
      );
    }

    // Check if the blog with the given id is saved by the user
    const saved = await db.blog.findFirst({
      where: {
        id: blogIdInt,
        savedBy: {
          some: {
            id: profile?.id,
          },
        },
      },
    });

    // Return true if the blog is saved by the user, otherwise false
    return new NextResponse(
      JSON.stringify({ isSaved: Boolean(saved) }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `error ${error}` }),
      {
        status: 500,
      }
    );
  }
};