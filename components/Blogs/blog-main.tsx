
'use client'
import BlogCard from "@/components/Blogs/blog-card"
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { AppContext } from "@/context/GlobalContext";
import Empty from "@/components/Global/empty";

const BlogMainContainer = () => {
    const { blog } = useContext(AppContext);
    const { memoizedAllBlogData, setAllBlogData, } = blog;
    const [isFetching, setIsFetching] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const fetchData = async () => {
        try {
            setIsFetching(true);
            const response = await axios.get("/api/blog");
            setAllBlogData(response.data);
            console.log("Blog Fetched Successfully:", response.data);

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
    // @eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchData(); // Fetch data on component mount

    }, []);

    if (!isMounted) {
        setIsMounted(true);
    }

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
            <div className="flex flex-row justify-around items-center">
                {memoizedAllBlogData && memoizedAllBlogData.length === 0 ? (
                    <Empty /> // Render Empty component when the array is empty
                ) : (
                    <BlogCard data={memoizedAllBlogData} isFetching={isFetching} />
                )}
            </div>
        </div>
    )

}

export default BlogMainContainer