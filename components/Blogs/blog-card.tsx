'use client'
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
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { FlagTriangleRight, Loader2, MoreVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs"
import { deleteBlog } from "@/server-action/blog-actions";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "../ui/badge";
import { useState } from "react";
import { BlogType } from "@prisma/client";

const BlogCard = ({ data, isFetching }: any) => {
    const router = useRouter();
    const { user } = useUser();
    const [isDelete, setIsDelete] = useState(false);

    const isAdmin = data?.author?.userId === user?.id;

    const handleBlogDelete = async (id: number) => {
        try {
            setIsDelete(true);
            const deletedBlog = await deleteBlog(id);
            console.log("Blog deleted successfully:", deletedBlog);
            setIsDelete(false);
            router.refresh()            // Optionally, you can trigger any additional actions after successful deletion here.
        } catch (error) {
            console.error("Error deleting blog:", error);
            setIsDelete(false);

            // Handle errors here if needed.
        }
    };

    return (
        <div className="grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 md:gap-4 gap-y-3 mt-10 mb-10">
            {
                data?.map((item: any) => (
                    <Card
                        key={item.id}
                        className="w-full max-w-fit border  flex-between flex-col cursor-pointer sm:max-w-[356px]"
                    >
                        <CardHeader>
                            <div className="flex flex-1 justify-between items-center w-full">
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
                                <Popover>
                                    <PopoverTrigger>
                                        <Button variant='ghost' size='icon' className='mx-2'>
                                            <MoreVerticalIcon className='h-5 w-5 text-zinc-600' />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align='end'
                                        sideOffset={5}
                                        className='bg-white dark:bg-zinc-900 flex flex-col items-start justify-start'>
                                        {isAdmin ||
                                            item?.author?.userId === user?.id

                                            ? (
                                                <>
                                                    <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                                                        <Pencil className='w-5 h-5 hover:text-green-400 text-zinc-500' />
                                                        Edit <Badge variant='default' className='ml-2'>Soon!</Badge>
                                                    </Button>
                                                    <Button onClick={() => handleBlogDelete(item?.id)} variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                                                        {isDelete ? <Loader2
                                                        className="animate-spin w-5 h-5 hover:text-red-700 text-zinc-500"
                                                        
                                                        /> : (<> <Trash2 className='w-5 h-5 hover:text-red-700 text-zinc-500' />
                                                            Delete</>)}
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                                                    <FlagTriangleRight className='h-5 w-5 hover:text-red-500 text-zinc-500' />
                                                    Report <Badge variant='default' className='ml-2'>Soon</Badge>
                                                </Button>
                                            )}
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <CardTitle onClick={() => router.push(`/blogs/${item.slug}`)} className=" paragraph-semibold line-clamp-1 w-full text-left">
                                {isFetching ? (
                                    <Skeleton className="w-auto h-auto leading-none tracking-normal" />
                                ) : (
                                    item?.title
                                )}
                            </CardTitle>
                            <div className="text-xs text-muted-foreground">
    {isFetching ? (
        <Skeleton className="w-auto h-auto text-xs" />
    ) : (
        <>
            {item?.blogType === BlogType.New && (
                <>
                    {formatDate(item?.createdAt) + " • " + item?.readTime + " m read time"}
                </>
            )}
        </>
    )}
</div>

                        </CardHeader>
                        <CardContent>
                           
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
    );
};

export default BlogCard;
