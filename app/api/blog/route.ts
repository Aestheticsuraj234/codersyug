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
       
        return new NextResponse(
            JSON.stringify({ message: "error" }),
            {
                status: 500,
            }
        )

    }
}


export const GET = async () => {
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
                createdAt: "desc",

            },
            include: {
                author: true,
                liked: true,
                comments: {
                    include: {
                        commenter: true
                    }
                }
            }
        })

        return NextResponse.json(blogs, {
            status: 200,
        })

    } catch (error) {
        
        return new NextResponse(
            JSON.stringify({ message: "error" }),
            {
                status: 500,
            }
        )
    }
}

// Enpoint to user can save the blog

// ...

export const PUT = async (req: Request) => {
    try {
        // Get the currently logged-in user's profile
        const profile = await currentProfile();

        // Check if the user is authenticated
        if (!profile) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            );
        }

        // Extract the blogId from the request body (assuming it's provided)
        const { blogId } = await req.json();

        // Find the blog by its ID
        const blog = await db.blog.findUnique({
            where: {
                id: blogId,
            },
        });

        if (!blog) {
            return new NextResponse(
                JSON.stringify({ message: "Blog not found" }),
                {
                    status: 404,
                }
            );
        }

        // Check if the user has already saved the blog
        const isSaved = await db.profile.findFirst({
            where: {
                id: profile.id,
                savedBlogs: {
                    some: {
                        id: blog.id,
                    },
                },
            },
        });

        if (isSaved) {
            // If the user has already saved the blog, remove it from the saved list
            await db.profile.update({
                where: {
                    id: profile.id,
                },
                data: {
                    savedBlogs: {
                        disconnect: {
                            id: blog.id,
                        },
                    },
                },
            });

            return new NextResponse(
                JSON.stringify({ message: "Blog removed from library" }),
                {
                    status: 201,
                }
            );
        } else {
            // If the user has not saved the blog, associate the user with the blog as a saved blog
            await db.profile.update({
                where: {
                    id: profile.id,
                },
                data: {
                    savedBlogs: {
                        connect: {
                            id: blog.id,
                        },
                    },
                },
            });

            return new NextResponse(
                JSON.stringify({ message: "Blog saved successfully" }),
                {
                    status: 200,
                }
            );
        }
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Error saving/removing the blog" }),
            {
                status: 500,
            }
        );
    }
};



