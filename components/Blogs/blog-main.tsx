
import BlogCard from "./blog-card";

const BlogMainContainer = () => {



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
            <div className=" flex flex-row  justify-around items-center
            ">
                {/* Blog Card */}
                <BlogCard />

            </div>
        </div>
    )

}

export default BlogMainContainer