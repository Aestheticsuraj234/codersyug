"use client"
import React, { useState, useContext, useEffect } from 'react';
import {
    Heart,
    MessageCircle,
    Loader2,
    BookmarkIcon,
    BookmarkPlus
} from 'lucide-react';
import { Button } from '../ui/button';

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import BlogCommentSidebar from './Comments/blog-comment-sidebar';
import { toast } from '@/components/ui/use-toast';
import { AppContext } from '@/context/GlobalContext';
import { isBlogLike, isBlogSave, likeBlog, saveBlog } from '@/server-action/blog-actions';
import { currentProfile } from '@/lib/current-profile';
import { useRouter } from 'next/navigation';
import { AiFillHeart } from 'react-icons/ai';


interface IdsProps {
    blogId: any;
    likes: number;
    likedBy: number[];
    comment: number;
    slug: string;
  }


const BlogBottomAction = ({ blogId, likes, likedBy, comment, slug }: IdsProps) => {

    const { blog } = useContext(AppContext);

    const [like, setLikes] = useState(likes);
    const [saved, setSaved] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState(false); // State to track if the user is saving the post
    const [isLiking, setIsLiking] = useState(false); // State to track if the user is liking the post
    const [Liked, setIsLiked] = useState(false); // State to track if the user has liked the post
    const [profile, setProfile] = useState<any | null>(null); // State to store the profile of the user
    const router = useRouter();


    const fetchProfile = async () => {
        try {
            const profile = await currentProfile();
            setProfile(profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])


    // if my blog is liked then unlike it other wise like it and show toast accordingly
    const toggleLikeClick = async () => {
        try {
            setIsLiking(true);
            const isLiked = await isBlogLike(blogId, profile?.id);
            if (isLiked) {
                await likeBlog(blogId);
                setIsLiked(false);
                toast({
                    title: "thanks",
                    description: "We Will Send FeedBack to Author",
                });
                setIsLiking(false);
                router.refresh()
            } else {
                await likeBlog(blogId);
                setIsLiked(true);
                toast({
                    title: "Success",
                    description: "Blog Liked Successfully",
                });
                setIsLiking(false);
                router.refresh()
            }

        } catch (error) {

            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong",
            })

        };
    }


    // if my blog is saved then unsave it other wise save it and show toast accordingly
    const toggleSavedButton = async () => {
        try {
            setIsSaving(true);
            const isSaved = await isBlogSave(blogId);
            if (isSaved) {
                await saveBlog(blogId);
                setSaved(false);
                toast({
                    title: "Success",
                    description: "Blog Unsaved Successfully",
                });
                setIsSaving(false);
            } else {
                await saveBlog(blogId);
                setSaved(true);
                toast({
                    title: "Success",
                    description: "Blog Saved Successfully",
                });
                setIsSaving(false);
            }

        } catch (error) {

            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong",
            })

        }
    };



// get check the blog is saved or not by current user
    const getSaved = async () => {
        try {
            console.log("blogId", blogId)
            const isSaved = await isBlogSave(blogId);
            setSaved(!!isSaved);

        } catch (error) {
            console.error("Error fetching SavedBlogs:", error);
        }
    };

    const getLiked = async () => {
        try {
            const isLiked = await isBlogLike(blogId, profile?.id);
            setIsLiked(!!isLiked);

        } catch (error) {
            console.error("Error fetching LikedBlogs:", error);
        }
    }



    useEffect(() => {
        // Check if blogId is defined before making the GET request
        getSaved();
        getLiked();

    }, []);

    return (
        <div className='w-96 h-14 fixed z-50 rounded-2xl bg-white dark:bg-zinc-800 shadow-md bottom-10 self-center px-4 py-2'>
            <div className='flex flex-row justify-around items-center '>
                <div className='flex flex-row  pr-3 gap-2 items-center justify-between '>
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={toggleLikeClick}
                        className='outline-none focus:outline-none 
                        
                        '
                    >
                        {isLiking ? (
              <Loader2 className="animate-spin text-gray-500 hover:text-rose-500" />
            ) : (
              Liked?
              <AiFillHeart size={ 24} className={"text-rose-500"} />
              :<Heart size={24} className={"text-gray-500 hover:text-rose-500"} />
            )}
            <span className="text-sm">{like}</span>
                    </Button>
                    <span className='font-semibold text-zinc-700 dark:text-zinc-200'>{like}</span>
                </div>
                <Sheet>

                    <SheetTrigger asChild className='flex flex-row  pr-3 gap-2 items-center justify-center'>
                        <Button variant={'ghost'} size={'default'} >
                            <MessageCircle size={30} className='text-zinc-700 dark:text-zinc-200' />
                            <span className='font-semibold text-zinc-700 dark:text-zinc-200'>{comment}</span>
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

                    /> : <Button variant={'ghost'} size={'icon'} onClick={toggleSavedButton} >
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
