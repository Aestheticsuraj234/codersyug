import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { BlogType } from "@prisma/client";


export const POST = async (req: Request) => {
    try {
        const {
            title,
            blogType,
            slug,
            BlogUrl,
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

            // Split the content into words using spaces
            const words = content.trim().split(/\s+/);

            // Calculate the number of words in the content
            const numberOfWords = words.length;

            // Calculate the estimated reading time based on words and punctuation
            const readingTime = Math.ceil(numberOfWords / wordsPerMinute);

            // A minimum reading time to ensure content isn't shown as "0 min read"
            const minReadingTime = 1;

            return readingTime < minReadingTime ? minReadingTime : readingTime;
        }



        let NewBlog;
        // use switch case to check the blog type
        switch (blogType) {
            case BlogType.Existing:
               
             
                // create a new existing blog
                NewBlog = await db.blog.create({
                    data: {
                        title: title,
                        BlogType: blogType,
                        blogUrl: BlogUrl,
                        description: description,
                        thumbnail: thumbnail,
                        category: category,
                        subCategory: subCategory,
                        author: {
                            connect: {
                                id: profile.id
                            }
                        }

                    }
                })
                console.log("Existing",NewBlog);
                return new NextResponse(
                    JSON.stringify({ message: "Blog created successfully" }),
                    {
                        status: 201,
                    }
                )

            case BlogType.New:
                // check if the blog is already exist
                const newBlog = await db.blog.findUnique({
                    where: {
                        slug: slug
                    }
                })

                if (newBlog) {
                    return new NextResponse(
                        JSON.stringify({ message: "Blog already exist" }),
                        {
                            status: 400,
                        }
                    )
                }

                // create a new  blog
                NewBlog = await db.blog.create({
                    data: {
                        title: title,
                        BlogType: blogType,
                        slug: slug,
                        description: description,
                        thumbnail: thumbnail,
                        category: category,
                        subCategory: subCategory,
                        content: content,
                        readTime: calculateReadTime(content),
                        author: {
                            connect: {
                                id: profile.id
                            }
                        }
                    }
                })
                console.log("New",NewBlog);

                return new NextResponse(
                    JSON.stringify({ message: "Blog created successfully" }),
                    {
                        status: 201,
                    }
                )



        }




    } catch (error: any) {
        console.log(error.message);
        return new NextResponse(
            JSON.stringify({ message: error.message }),
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

        console.log(blogs);
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



