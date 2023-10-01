"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BlogContentInterFace } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BlogCardActions from '@/components/Blogs/blog-card-actions';

import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import Empty from '@/components/Global/empty';

const SavedBlogs = () => {
  const [savedBlogs, setSavedBlogs] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  useEffect(() => {
    fetchSavedBlogs();
    setIsMounted(true);
  }, []);

  const fetchSavedBlogs = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get('/api/blog/saved');
      setSavedBlogs(res.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  if (!isMounted) {
    setIsMounted(true);
  }

  return (
    <div className="mt-20 mx-4 flex-1 w-full justify-center items-center">
      {savedBlogs.length === 0 ? (
        <Empty /> // Render Empty component when the array is empty
      ) : (
        <>
          <h1
            className="
            font-bold 
            text-start
            text-xl 
            bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400
            "
          >
            Saved
          </h1>
          <div
            className="flex flex-row  justify-around items-center"
          >
            <div className="grid xl:grid-cols-3 items-center justify-center md:grid-cols-2 grid-cols-1 md:gap-4 gap-y-3 mt-10 mb-10">
              {savedBlogs.map((item: BlogContentInterFace) => (
                <Card
                  key={item.id}
                  className="h-auto md:w-72  w-auto border shadow-md rounded-lg flex flex-col justify-between items-start"
                >
                  <CardHeader>
                    <Avatar>
                      {isFetching ? (
                        <Skeleton className="aspect-square h-full w-full rounded-full" />
                      ) : (
                        <>
                          <AvatarImage src={item?.author?.imageUrl} />
                          <AvatarFallback>CN</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <CardTitle onClick={() => router.push(`/blogs/${item.slug}`)} className="hover:underline cursor-pointer">
                      {isFetching ? (
                        <Skeleton className="w-auto h-auto leading-none tracking-normal" />
                      ) : (
                        item?.title
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {isFetching ? (
                        <Skeleton className="w-auto h-auto text-xs" />
                      ) : (
                        formatDate(item?.createdAt) + " • " + item?.readTime + " m read time"
                      )}
                    </CardDescription>
                    {isFetching ? (
                      <Skeleton className="w-[250px] h-[152px] object-cover rounded-lg mt-1" />
                    ) : (
                      <Image
                        src={item?.thumbnail}
                        alt="Thumbnail of the blog"
                        width={288}
                        height={152}
                        className="object-cover rounded-lg mt-1"
                        objectFit="cover"
                      />
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-row w-full mx-2">
                    {isFetching ? (
                      <Skeleton className="flex flex-row justify-between items-center w-full mt-2" />
                    ) : (
                      <BlogCardActions
                        blogId={item?.id}
                        likes={item?.likes}
                        likedBy={
                          item?.liked?.map((like: any) => like?.userId) || []
                        }
                        comment={item?.comments?.length || 0}
                        slug={item?.slug}
                      />
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedBlogs;
