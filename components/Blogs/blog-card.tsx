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


const BlogCard = ({ data, isFetching }: any) => {
    const router = useRouter();

    return (
        <div className="grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 md:gap-4 gap-y-3 mt-10 mb-10">
            {
                data?.map((item: any) => (
                    <Card
                        key={item.id}
                        className="w-full max-w-fit border cursor-pointer sm:max-w-[356px]"
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

                            <CardTitle onClick={() => router.push(`/blogs/${item.slug}`)} className=" paragraph-semibold line-clamp-1 w-full text-left">
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
    );
};

export default BlogCard;