"use server"

import { db } from '@/lib/db';



export const deleteBlog = async (id: number) => {
 const deletedBlog =   await db.blog.delete({
        where: { id },

    });
    return deletedBlog;
    
}


export const deleteBlogComment = async (id: number) => {
    const blog = await db.comment.delete({
        where: { id },
    });
    return blog;
}