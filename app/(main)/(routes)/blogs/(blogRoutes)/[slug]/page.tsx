"use client"
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HTMLReactParser from 'html-react-parser';
import BlogBottomAction from '@/components/blog-bottom-action';
import { Skeleton } from '@/components/ui/skeleton';


interface BlogContentInterFace {
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
}

const BlogMainContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogContentInterFace | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:3000/api/blog/${slug}`);
        const data = await res.data;
        setBlogData(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const memoizedBlogData = useMemo(() => blogData, [blogData, isLoading]);

  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="mt-20 mx-4 flex-1 w-full justify-center items-center">
        <h1 className="font-bold text-start text-xl text-zinc-800 dark:text-zinc-100 mb-10">
          {isLoading ? (
            <Skeleton style={{ width: '80%', height: '1rem' }} />
          ) : (
            memoizedBlogData?.title
          )}
        </h1>

        <div className="flex-1 h-[20rem] w-full">
          {isLoading ? (
            <Skeleton style={{ width: '100%', height: '20rem' }} />
          ) : (
            <img
              src={memoizedBlogData?.thumbnail as string}
              alt="Thumbnail of the blog"
              className="w-full h-full object-contain rounded-xl"
            />
          )}
        </div>

        <div className="flex flex-row justify-between items-center w-full h-23 mt-10">
          <div className="flex flex-row justify-center items-center gap-2">
            <Avatar>
              {isLoading ? (
                <Skeleton style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }} />
              ) : (
                <>
                  <AvatarImage src={memoizedBlogData?.author?.imageUrl} />
                  <AvatarFallback>
                    {memoizedBlogData?.author?.name ? memoizedBlogData?.author?.name.charAt(0) : ''}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <p className="text-zinc-600 dark:text-zinc-100 font-bold text-xl">
              {isLoading ? <Skeleton style={{ width: '4rem', height: '1rem' }} /> : memoizedBlogData?.author?.name}
            </p>
            <span>•</span>
            <p className="text-zinc-600 dark:text-zinc-100 font-semibold text-lg">
              {isLoading ? (
                <Skeleton style={{ width: '3rem', height: '1rem' }} />
              ) : (
                `${formatDate(memoizedBlogData?.createdAt as string)} • ${memoizedBlogData?.readTime} m read time`
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-start items-start mt-10">
          <div className="flex flex-col justify-start items-start px-10 py-10 mx-4 w-full h-full rounded-xl bg-zinc-100 dark:bg-gray-800 mb-10">
            {isLoading ? (
              <>
                <Skeleton style={{ width: '100%', height: '1rem' }} />
                <Skeleton style={{ width: '90%', height: '1rem' }} />
                <Skeleton style={{ width: '80%', height: '1rem' }} />
                {/* Add more skeleton lines for paragraphs */}
              </>
            ) : (
              memoizedBlogData?.content && HTMLReactParser(memoizedBlogData?.content as string)
            )}
          </div>
        </div>
      </div>

      <BlogBottomAction likes={memoizedBlogData?.likes} blogId={memoizedBlogData?.id as number} 
        />
  
    </div>
  );
};

export default BlogMainContent;
