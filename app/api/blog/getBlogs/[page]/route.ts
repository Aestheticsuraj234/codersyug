import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const GET = async (req: Request, {
    params
}: any) => {
    try {
        const { page } = params;

        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            )
        }
        const blogs = await db.blog.findMany({
            take: 3, // Initially load 3 blogs
            skip: (page - 1) * 3, // Skip based on the page number
            orderBy: {
              createdAt: "desc"
            },
            include: {
              author: true,
              liked: true,
              comments: {
                include: {
                  commenter: true,
                },
              },
            },
          });
          

        return new NextResponse(JSON.stringify(blogs), {
            status: 200,
        });

    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Error fetching blogs" }),
            {
                status: 500,
            }
            );
    }
}
