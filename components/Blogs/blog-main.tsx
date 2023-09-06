"use client"
// TODO: Create BlogMainContainer component which is render on the params of the blog page like if the params is upvoted then it will render the upvoted blogs.


import { useParams } from "next/navigation";
import BlogCard from "./blog-card";


const BlogMainContainer = () => {

    const params = useParams();
    console.log(params);


    return (
        <div className="mt-20 mx-4  flex-1 w-full justify-center items-center">
            <h1 className="
            font-bold 
            text-start
            text-xl 
            bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400
            ">
                Popular
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2
            lg:grid-cols-3
            gap-4
            mt-10
            justify-center
            items-center

          
            
            ">
                {/* Blog Card */}
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />

            </div>
        </div>
    )

}

export default BlogMainContainer