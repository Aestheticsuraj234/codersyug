import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const GET = async () => {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const readingHistory = await db.visitedBlog.findMany({
            where: {
                visitorId: profile.id
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                blog: {
                    include: {
                        author: true,
                        liked: true,
                    }
                },
                visitor: true,
            }

        });

        return new NextResponse(JSON.stringify(readingHistory), {
            status: 200,
        });




    } catch (error) {
        return new NextResponse(`error: ${error}`, { status: 500 });
    }

}