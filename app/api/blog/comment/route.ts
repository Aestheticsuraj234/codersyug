import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const POST = async (req: Request) => {
    try {
        const { blogId, comment } = await req.json();
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            )
        }
        const NewComment = await db.comment.create({
            data: {
                text: comment, // Assuming 'text' is the correct field name in your Prisma schema
                blog: {
                    connect: { id: blogId }, // Use the 'connect' property to associate with the blog
                },
                commenter: {
                    connect: { id: profile.id },
                },
            },
        });
        return new NextResponse(
            JSON.stringify(NewComment),
            {
                status: 201,
            }
        )





    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error.message }),
            {
                status: 500,
            }
        )

    }

}

// export const GET = async (req: Request, { params }: any) => {
//     try {
//         const { blogId } = params;
//         const comments = await db.comment.findMany({
//             where: {
//                 blogId: blogId,
//             },
//             include: {
//                 commenter: true,
//             },
//         });
//         return new NextResponse(
//             JSON.stringify(comments),
//             {
//                 status: 200,
//             }
//         )

//     } catch (error: any) {
//         return new NextResponse(
//             JSON.stringify({ message: error.message }),
//             {
//                 status: 500,
//             }
//         )

//     }
// }