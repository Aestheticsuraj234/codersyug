"use client"
import React, { useState, useContext } from "react";

import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlogCardActions from "@/components/Blogs/blog-card-actions";

import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

import { AppContext } from "@/context/GlobalContext";
import { BlogContentInterFace } from '@/types'
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";

const MostLikedBlogs = () => {
    const { blog } = useContext(AppContext);
    const { memoizedAllBlogData } = blog;
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const mostLikedBlogs = memoizedAllBlogData?.filter((blog: BlogContentInterFace) => blog.likes > 1)
    console.log(mostLikedBlogs);
    if (!isMounted) {
        setIsMounted(true);
    }

    return (
        mostLikedBlogs && mostLikedBlogs.length === 0 ? (
            <Empty />
        ) :
            <div className="mt-20 mx-4  flex-1 w-full justify-center items-center">
                <h1 className="
        font-bold 
        text-start
        text-xl 
        bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400
        ">
                    Most Liked
                </h1>
                <div className=" flex flex-row  justify-around items-center
        ">
                    <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
                        {mostLikedBlogs?.map((item: BlogContentInterFace) => (
                            <Card
                                key={item.id}
                                className="h-auto w-72 border shadow-md rounded-lg flex flex-col justify-between items-start"
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
            </div>

    );
}

export default MostLikedBlogs