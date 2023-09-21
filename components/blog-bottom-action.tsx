"use client"
import React, { useState, useContext, useEffect, experimental_useOptimistic as useOptimistic, use } from 'react';
import {
    Heart,
    MessageCircle,
    Bookmark,
    Share2,
    MoreVertical,
    Loader2,
    BookMarked,
    BookmarkIcon,
    BookmarkPlus
} from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { AppContext } from '@/context/GlobalContext';
import BlogCommentSidebar from './Blogs/Comments/blog-comment-sidebar';
import { toast } from './ui/use-toast';



const BlogBottomAction = () => {

    const { blog } = useContext(AppContext);
    const { memoizedBlogData, like, setLikes } = blog;
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false); // State to track if the user is saving the post
    const [isLiking, setIsLiking] = useState(false); // State to track if the user is liking the post
    const [isLiked, setIsLiked] = useState(false); // State to track if the user has liked the post

    const commentsLength = memoizedBlogData?.comments?.length;
    const blogId = memoizedBlogData?.id;

    useEffect(() => {
        // Check if blogId is defined before making the GET request

        getSaved(blogId);

    }, [blogId]);
    const handleLikeClick = async () => {
        if (isLiking) return;
        setIsLiking(true);

        try {
            const res = await axios.post('http://localhost:3000/api/blog/like', {
                blogId: memoizedBlogData?.id,
            });
            const data = res.data.likes;

            // Client-side validation: Ensure the like count doesn't go below 0
            if (data >= 0) {

                setLikes(data);
                setIsLiked(!isLiked);

            } else {
                // Handle the case where the server returned a negative like count
                console.error('Server returned a negative like count');
            }
        } catch (error) {
            console.error('Error liking/disliking:', error);
        } finally {
            setIsLiking(false);
        }
    };


    const handleSaveClick = async () => {
        try {
            // If it's not saved, save it
            setIsSaving(true);
            const res = await axios.put("http://localhost:3000/api/blog", {
                blogId: memoizedBlogData?.id,
            });
            console.log(res.data, "res");
            if (res.status === 200) {
                setSaved(true);
                toast({
                    title: "Success",
                    description: "Blog Saved Successfully",
                });
                setIsSaving(false);
            }
            else if (res.status === 201) {
                setSaved(false);
                toast({
                    title: "Success",
                    description: "Blog Unsaved Successfully",
                });
                setIsSaving(false);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Blog Not Saved Successfully",
            });
            setIsSaving(false);
        }
    };
    const getSaved = async (blogId: number) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/blog/saved/${blogId}`);
            if (res.status === 200) {
                setSaved(res.data.isSaved);
            } else {
                console.error("Failed to fetch saved status");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-96 h-14 fixed z-50 rounded-2xl bg-white dark:bg-zinc-800 shadow-md bottom-10 self-center px-4 py-2'>
            <div className='flex flex-row justify-around items-center '>
                <div className='flex flex-row  pr-3 gap-2 items-center justify-between '>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={handleLikeClick}
                        className='outline-none focus:outline-none 
                        
                        '
                    >
                        {isLiking ? (
                            <Loader2
                                size={30}
                                className='text-zinc-700 dark:text-zinc-200 animate-spin'
                            />
                        ) : (
                            <Heart
                                size={30}
                                className={cn(
                                    `hover:text-red-500  `
                                )}
                            />
                        )}
                    </Button>
                    <span className='font-semibold text-zinc-700 dark:text-zinc-200'>{like}</span>
                </div>
                <Sheet>

                    <SheetTrigger asChild className='flex flex-row  pr-3 gap-2 items-center justify-center'>
                        <Button variant={'ghost'} size={'default'} >
                            <MessageCircle size={30} className='text-zinc-700 dark:text-zinc-200' />
                            <span className='font-semibold text-zinc-700 dark:text-zinc-200'>{commentsLength}</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-0 flex gap-0 pt-10 px-4 flex-col justify-start items-start ">
                        <BlogCommentSidebar />
                    </SheetContent>
                </Sheet>


                <div className='flex flex-row  pr-3 gap-2 items-center justify-center '>

                    {isSaving ? <Loader2
                        size={30}
                        className='text-zinc-700 dark:text-zinc-200 animate-spin'

                    /> : <Button variant={'ghost'} size={'icon'} onClick={handleSaveClick} >
                        {
                            saved ? (
                                <BookmarkPlus
                                    size={30}

                                    className="text-green-500 " />
                            ) : (
                                <BookmarkIcon
                                    size={30}
                                    className="hover:text-yellow-400" />
                            )
                        }
                    </Button>}
                </div>


            </div>
        </div>
    );
};

export default BlogBottomAction;
