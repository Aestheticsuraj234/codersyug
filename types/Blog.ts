import { BlogType } from "@prisma/client"

export  interface BlogContentInterFace {
    liked: any
    author: {
      id: number | string,
      name: string,
      email: string,
      userId: string,
      imageUrl: string,
    }
    authorId: number | string,
    category: string,
    content: HTMLAllCollection | string,
    BlogType: BlogType,
    createdAt: string,
    updatedAt: string,
    description: string,
    likes: number,
    readTime: string,
    slug: string,
    title: string,
    thumbnail: string,
    id: number,
    comments: {
      length: number
      id: number | string,
      blogId: number | string,
      text: string,
      createdAt: string,
      updatedAt: string,
      commenter:{
        id: number | string,
        name: string,
        email: string,
        userId: string,
        imageUrl: string,
      }
    }
  }


  export interface ReadingHistoryItem {
    blog: {
      author: {
        id: number;
        userId: string;
        name: string;
        email: string;
        imageUrl: string;
      }
      id: number;
      title: string;
      slug: string;
      description: string;
      thumbnail: string;
      readTime: string;
    };
    blogId: number;
    createdAt: string;
    id: number;
    updatedAt: string;
    visitor: {
      id: number;
      userId: string;
      name: string;
      email: string;
      imageUrl: string;
    };
    visitorId: number;
  }