"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import BlogCardActions from "./blog-card-actions"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "../ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"



const BlogCard = () => {
    const [blog, setBlog] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        fecthData()
    }, [])

    const fecthData = async () => {
        try {
            setIsFetching(true)
            const response = await axios.get("http://localhost:3000/api/blog");
            setBlog(response.data)
            console.log(response.data)
            toast({
                title: "Success",
                description: "Blog Fetched Successfully",
            });
            setIsFetching(false)

        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
            });
            setIsFetching(false)
        }
        finally {
            setIsFetching(false)
        }

    }
    return (
        <div className="grid grid-cols-3 gap-4 mt-10">
            {/* wanted to show skeletion loader till the data is fetching from backend */}

            <Card className='h-[22rem] w-72 border shadow-md rounded-lg flex flex-col justify-start  items-start'>
                <CardHeader>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle>How to hide Endpoint in Swagger</CardTitle>
                </CardHeader>
                <CardContent >
                    <CardDescription>
                        Aug 24 • 7m read time
                    </CardDescription>
                    <Image
                        src={"https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/5f3aaaf7ab6e5c54e30e33b03b5548a1?_a=AQAEufR"}
                        alt="Thumbnail of the blog"
                        width={288}
                        height={152}
                        className="object-cover rounded-lg mt-1 "
                        objectFit="cover"


                    />
                </CardContent>
                <CardFooter className="flex flex-row  w-full mx-2">
                    <BlogCardActions />

                </CardFooter>
            </Card>

        </div>
    )
}

export default BlogCard