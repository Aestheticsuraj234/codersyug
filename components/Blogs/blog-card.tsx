"use client"
import React, { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlogCardActions from "./blog-card-actions";
import { toast } from "../ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { AppContext } from "@/context/GlobalContext";
import { formatDate } from "@/lib/utils";

const BlogCard = () => {
    const { blog } = useContext(AppContext);
    const { memoizedAllBlogData,
        setAllBlogData, } = blog;
        console.log(memoizedAllBlogData,"memoizedAllBlogData");
    const [isFetching, setIsFetching] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const fetchData = async () => {
        try {
            setIsFetching(true);
            const response = await axios.get("http://localhost:3000/api/blog");
            setAllBlogData(response.data);
            console.log(response.data);
            toast({
                title: "Success",
                description: "Blog Fetched Successfully",
            });

        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
            });
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);





    if (!isMounted) {
        setIsMounted(true);
    }

    return (
        <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
            {memoizedAllBlogData?.map((item: {
                comments: any;
                liked: any;
                slug: any;
                likes: any;
                id: React.Key | null | undefined; author: {
                    userId: any; imageUrl: string | undefined;
                }; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; createdAt: any; readTime: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; thumbnail: string | StaticImport;
            }) => (
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
                                    item?.liked?.map((like:any) => like?.userId) || []
                                }
                                comment={item?.comments?.length || 0} 
                                slug={item?.slug}
                            />
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default BlogCard;
