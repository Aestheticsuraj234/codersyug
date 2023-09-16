import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
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
import BlogCardActions from "./blog-card-actions";
import { toast } from "../ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const BlogCard = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const fetchData = async () => {
        try {
            setIsFetching(true);
            const response = await axios.get("http://localhost:3000/api/blog");
            setBlog(response.data);
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

    const [blog, setBlog] = useState<any>([]);

    // Use useMemo to cache the blog data and prevent unnecessary fetching
    const blogData = useMemo(() => {

        return blog;
    }, [blog]);

    const formatDate = (dateString: string | number | Date) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!isMounted) {
        setIsMounted(true);
    }

    return (
        <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
            {blogData.length === 0 ? (
                <div className="text-center col-span-3">No blogs to show</div>
            ) : (
                blogData.map((item: {
                    likes: any;
                    id: React.Key | null | undefined; author: {
                        userId: any; imageUrl: string | undefined;
                    }; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; createdAt: any; readTime: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; thumbnail: string | StaticImport;
                }) => (
                    isFetching ? <Skeleton className="rounded-lg   shadow-sm h-auto w-72 " /> :
                        <Card
                            key={item.id}
                            className="h-auto w-72 border shadow-md rounded-lg flex flex-col justify-between items-start"
                        >
                            <CardHeader>
                                <Avatar>
                                    {isFetching ? <Skeleton className="aspect-square h-full w-full rounded-full" /> :

                                        (
                                            <>
                                                <AvatarImage src={item?.author?.imageUrl} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </>
                                        )
                                    }

                                </Avatar>
                                <CardTitle>
                                    {isFetching ? <Skeleton className=" w-auto h-auto leading-none tracking-normal" /> : item?.title}

                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {isFetching ? <Skeleton className="w-auto h-auto text-xs " /> :
                                        formatDate(item?.createdAt) + " • " + item?.readTime + " m read time"}
                                </CardDescription>
                                {
                                    isFetching ? <Skeleton className="w-[288px] h-[152px] object-cover rounded-lg mt-1" /> :

                                        <Image
                                            src={item?.thumbnail}
                                            alt="Thumbnail of the blog"
                                            width={288}
                                            height={152}
                                            className="object-cover rounded-lg mt-1"
                                            objectFit="cover"
                                        />
                                }
                            </CardContent>
                            <CardFooter className="flex flex-row w-full mx-2">

                                {isFetching ? <Skeleton className="flex flex-row justify-between items-center w-full mt-2" /> :
                                    <BlogCardActions
                                        blogId={
                                            item?.id
                                        }
                                        likes = {
                                            item?.likes
                                        }
                                    />
                                }
                            </CardFooter>
                        </Card>
                ))
            )}
        </div>
    );
};

export default BlogCard;
