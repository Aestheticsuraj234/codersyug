import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (res: Response) => {
  try {
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

    // Fetch the savedBlogs for the currently logged-in profile
    const savedBlogs = await db.profile.findUnique({
      where: {
        id: profile?.id, // Assuming 'id' is the primary key of the Profile model
      },
      include: {
        savedBlogs: {
          include: {
            author: true,
            savedBy: true,
            liked: true,
            comments:true,
          },
        },

      },
    });

    if (!savedBlogs) {
      return new NextResponse(
        JSON.stringify({ message: "Profile not found" }),
        {
          status: 404,
        }
      );
    }

    // Return the list of savedBlogs
    return new NextResponse(JSON.stringify(savedBlogs.savedBlogs ), {
      status: 200,

    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Error: ${error}` }),
      {
        status: 500,
      }
    );
  }
};
