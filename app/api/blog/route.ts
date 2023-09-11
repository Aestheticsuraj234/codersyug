import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";


export const POST = async (req: Request) => {
    try {
        const {
            title,
            slug,
            description,
            thumbnail,
            category,
            subCategory,
            content,
        } = await req.json();
        console.log(title, description, thumbnail, category, subCategory, content);
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            )
        }


        const calculateReadTime = (content: string): number => {
            // Define the average reading speed in words per minute
            const wordsPerMinute = 200;

            // Split the content string into words by spaces
            const words = content.trim().split(/\s+/);

            // Calculate the number of words in the content
            const numberOfWords = words.length;

            // Calculate the estimated reading time in minutes
            const readTime = Math.ceil(numberOfWords / wordsPerMinute);

            return readTime;
        }




        const newBlog = await db.blog.create({
            data: {
                title: title,
                description: description,
                thumbnail: thumbnail,
                category: category,
                subCategory: subCategory,
                content: content,
                slug: slug,
                readTime: calculateReadTime(content),
                author: {
                    connect: {
                        id: profile?.id
                    }
                }
            }
        })

        return NextResponse.json(newBlog, {
            status: 201,
        });

    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "error" }),
            {
                status: 500,
            }
        )

    }
}


export const GET = async (req: Request) => {
    try {
        // here we are fetching all the blogs from the prisma db
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            )
        }
        // wanted to fetch blog and the user who is created this blog

        const blogs = await db.blog.findMany({
            orderBy: {
                createdAt: "asc"
            },
            include: {
                author: true
            }
        })
        return NextResponse.json(blogs, {
            status: 200,
        })

    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "error" }),
            {
                status: 500,
            }
        )
    }
}