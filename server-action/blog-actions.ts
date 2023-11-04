"use server"

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { revalidatePath } from 'next/cache';

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



export const isBlogSave = async (id: number) => {
const profile = await currentProfile();
   // Check if the blog with the given id is saved by the user
   const saved = await db.blog.findFirst({
    where: {
      id: id,
      savedBy: {
        some: {
          id: profile?.id,
        },
      },
    },
  });

return Boolean(saved);
}


export const saveBlog = async (id: number) => {
    const profile = await currentProfile();
    const blog = await db.blog.findUnique({
        where: { id }
    });
    if (!blog) {
        throw new Error('Blog not found');
    }
    if (await isBlogSave(id)) {
        await db.blog.update({
            where: { id },
            data: {
                savedBy: {
                    disconnect: {
                        id: profile?.id
                    }
                }
            }
        });
    } else {
        await db.blog.update({
            where: { id },
            data: {
                savedBy: {
                    connect: {
                        id: profile?.id
                    }
                }
            }
        });
    }
    revalidatePath('/blogs');
    return true;
}


// Check if a blog is liked by the current user
export const isBlogLike = async (blogId: number, userId: number | undefined) => {
    const like = await db.likes.findFirst({
      where: {
        userId: userId,
        blogId: blogId,
      },
    });
    return Boolean(like);
  }
  


  export const likeBlog = async (id: number) => {
    const profile = await currentProfile();
    const blog = await db.blog.findUnique({
        where: { id }
    });
    
    if (!blog) {
        throw new Error('Blog not found');
    }

    // Check if the blog is already liked
    const isLiked = await isBlogLike(id, profile?.id);

    if (isLiked) {
        // Blog is already liked, so unlike it
        await db.likes.delete({
            where: {
                userId_blogId: {
                    // @ts-ignore -- TS doesn't know about composite keys
                    userId: profile?.id,
                    blogId: id,
                }
            }
        });

        // Decrement likes count in the blog
        await db.blog.update({
            where: { id },
            data: {
                likes: {
                    decrement: 1
                }
            }
        });
    } else {
        // Blog is not liked, so like it
        await db.likes.create({
            data: {
                liker: {
                    connect: {
                        id: profile?.id
                    }
                },
                Blog: {
                    connect: {
                        id: blog.id
                    }
                }
            }
        });

        // Increment likes count in the blog
        await db.blog.update({
            where: { id },
            data: {
                likes: {
                    increment: 1
                }
            }
        });
    }

    revalidatePath('/blogs');
    return true;
}



export const fetchBlogBySlug = async (slug: any) => {
    const profile = await currentProfile();

    if (!profile) {
       throw Error('Unauthorized');
    }

     // Fetch the blog without any user authorization check
     const blog = await db.blog.findUnique({
        where: {
          slug,
        },
        include: {
          author: true,
          liked: true,
          comments: {
            include: {
              commenter: true,
            }
          }
        }
        
      });

        if (!blog) {
            throw Error('Not found');
        }

         // Create a VisitedBlog record and associate it with the logged-in user and the visited blog but not duplicate

    const visitedBlog = await db.visitedBlog.findFirst({
        where: {
          blogId: blog?.id,
          visitorId: profile?.id,
        },
      });
  
      if (!visitedBlog) {
        await db.visitedBlog.create({
          data: {
            blogId: blog.id,
            visitorId: profile.id,
          },
        });
      }
    return blog;


}