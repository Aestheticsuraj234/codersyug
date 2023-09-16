"use server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { revalidatePath, revalidateTag } from "next/cache";



export default async function LikesTheBlog(blogId: any) {
    try {
        const profile = await currentProfile();

        const blog = await db.blog.findUnique({
            where: { id: blogId },
        });

        if (!blog) {
            return "Blog not found";
        }
        const existingLike = await db.likes.findFirst({
            where: {
                liker: {
                    userId: profile?.userId,
                },
                blogId: blogId,
            },
        });

        if (existingLike) {
            await db.likes.delete({
                where: {
                    id: existingLike.id,
                },
            });

            // Decrement the likes of the blog
            const updatedBlog = await db.blog.update({
                where: { id: blogId },
                data: {
                    likes: {
                        decrement: 1,

                    },
                },
            });
            revalidatePath("/blogs");
            return updatedBlog;


        } else {
            // Increment the likes of the blog
            const updatedBlog = await db.blog.update({
                where: { id: blogId },
                data: {
                    likes: {
                        increment: 1,
                    },
                },
            });

            // Create a new like with the associated blog
            await db.likes.create({
                data: {
                    liker: {
                        connect: { userId: profile?.userId },
                    },
                    Blog: { connect: { id: blogId } },
                },
            });

            revalidatePath("/blogs");
            return updatedBlog;
        }


    } catch (error) {
        console.log(error);
        return error;
    }
}