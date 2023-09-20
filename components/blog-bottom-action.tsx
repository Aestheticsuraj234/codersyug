"use client"
import React, { useState, useEffect } from 'react';
import {
    Heart,
    MessageCircle,
    Bookmark,
    Share2,
    MoreVertical,
    Loader2,
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
import { MobileNavigation } from './mobile-navigation';
import BlogCommentSidebar from './Blogs/Comments/blog-comment-sidebar';

interface BottomBlogInteface {
    likes?: number;
    blogId?: number | string;

}

const BlogBottomAction = ({ likes, blogId }: BottomBlogInteface) => {
    const [like, setLikes] = useState(likes);
    const [isLiking, setIsLiking] = useState(false); // State to track if the user is liking the post
    const [isLiked, setIsLiked] = useState(false); // State to track if the user has liked the post
    const [previousLikes, setPreviousLikes] = useState(likes); // State to store the previous likes


    const handleLikeClick = async () => {
        if (isLiking) return;
        setIsLiking(true);

        try {
            const res = await axios.post('http://localhost:3000/api/blog/like', {
                blogId: blogId,
            });
            const data = res.data.likes;

            // Client-side validation: Ensure the like count doesn't go below 0
            if (data >= 0) {
                setPreviousLikes(like); // Store the previous likes before updating
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

    // useEffect to update previousLikes when likes prop changes
    useEffect(() => {
        setPreviousLikes(likes);
    }, [likes]);




    return (
        <div className='w-96 h-14 fixed z-50 rounded-2xl bg-white dark:bg-zinc-800 shadow-md bottom-10 self-center px-4 py-2'>
            <div className='flex flex-row justify-around items-center '>
                <div className='flex flex-row border-r pr-3 gap-2 items-center justify-center '>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={handleLikeClick}
                        className='outline-none focus:outline-none'
                    >
                        {isLiking ? (
                            <Loader2
                                size={24}
                                className='text-zinc-700 dark:text-zinc-200 animate-spin'
                            />
                        ) : (
                            <Heart
                                size={24}
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
                        <Button variant={'ghost'} size={'icon'} >
                            <MessageCircle size={24} className='text-zinc-700 dark:text-zinc-200' />
                        </Button>
                    </SheetTrigger>
                    <span className='font-semibold text-zinc-700 dark:text-zinc-200'>2</span>
                    <SheetContent side="right" className="p-0 flex gap-0 pt-10 px-4 flex-col justify-start items-start ">
                   
                        {/* <MobileNavigation /> */}
                        <BlogCommentSidebar/>
                    </SheetContent>
                </Sheet>
                <div className='flex flex-row border-r pr-3 gap-2 items-center justify-center '>
                    <Button variant={'ghost'} size={'icon'}>
                        <Bookmark size={24} className='text-zinc-700 dark:text-zinc-200' />
                    </Button>
                </div>

                <div className='flex flex-row border-r pr-3 gap-2 items-center justify-center '>
                    <Button variant={'ghost'} size={'icon'}>
                        <Share2 size={24} className='text-zinc-700 dark:text-zinc-200' />
                    </Button>
                </div>

                <div className='flex flex-row border-r pr-3 gap-2 items-center justify-center '>
                    <Button variant={'ghost'} size={'icon'}>
                        <MoreVertical size={24} className='text-zinc-700 dark:text-zinc-200' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BlogBottomAction;
