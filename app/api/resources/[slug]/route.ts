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

    const resource = await db.resources.findUnique({
        where: {
          Slug: slug,
        },
        select: {
          id: true,
          Title: true,
          Description: true,
          DownloadLink: true,
          Views: true,
          Thumbnail: true,
        },
      });

    if (!resource) {
        return generateErrorResponse("Not found", 404);
    }
   
    
    return new NextResponse(JSON.stringify(resource), {
        status: 200,
    });

  

   
  } catch (error) {
    return generateErrorResponse(`ResourcesDownloading page fetching causing ${error} `, 500);
  }
};
