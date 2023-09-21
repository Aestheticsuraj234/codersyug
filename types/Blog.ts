export  interface BlogContentInterFace {
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
    createdAt: string,
    updatedAt: string,
    description: string,
    likes: number,
    readTime: string,
    slug: string,
    title: string,
    thumbnail: string,
    id: number | string,
    comments: {
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