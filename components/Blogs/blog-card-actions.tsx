"use client";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookmarkIcon, Heart, MessageCircle, Loader2, BookmarkPlus } from "lucide-react";

import { toast } from "../ui/use-toast";
import { useRouter as useNavigation } from "next/navigation";
import { isBlogLike, isBlogSave, likeBlog, saveBlog } from "@/server-action/blog-actions";
import { AiFillHeart } from "react-icons/ai";
import { currentProfile } from "@/lib/current-profile";

import { useRouter } from "next/navigation";
interface IdsProps {
  blogId: any;
  likes: number;
  likedBy: number[];
  comment: number;
  slug: string;
}

const BlogCardActions = ({ blogId, likes, likedBy, comment, slug }: IdsProps) => {
  const router = useRouter();
 
  const [like, setLikes] = useState(likes);
  const [comments, setComments] = useState(comment);
  const [isLiking, setIsLiking] = useState(false);
  const [Liked, setIsLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<any | null>(null);

  const fetchProfile = async () => {
    try {
      const profile = await currentProfile();
      setProfile(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }
 
useEffect(()=>{
  fetchProfile()
  

},[])


 const getLiked = async () => {
    try {
      const isLiked = await isBlogLike(blogId,profile?.id);
      setIsLiked(!!isLiked);

    } catch (error) {
      console.error("Error fetching LikedBlogs:", error);
    }
  }
 


  // if my blog is liked then unlike it other wise like it and show toast accordingly
  const toggleLikeClick = async () => {
    try {
      setIsLiking(true);
      const isLiked = await isBlogLike(blogId,profile?.id);
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

  const getSaved = async () => {
    try {
      const isSaved = await isBlogSave(blogId);
      setSaved(!!isSaved);

    } catch (error) {
      console.error("Error fetching SavedBlogs:", error);
    }
  };


  useEffect(() => {
    getSaved();
    getLiked();
  }, [])


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

  const handleCommentsClick = () => {
    router.push(`/blogs/${slug}`);
  }

  const blogActions = [
    {
      name: "Like",
      icon: (
        <TooltipTrigger onClick={toggleLikeClick}>
          <div className="flex flex-row justify-center items-center space-x-1 cursor-pointer hover:text-gray-500 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
            {isLiking ? (
              <Loader2 className="animate-spin text-gray-500 hover:text-rose-500" />
            ) : (
              Liked?
              <AiFillHeart size={ 24} className={"text-rose-500"} />
              :<Heart size={24} className={"text-gray-500 hover:text-rose-500"} />
            )}
            <span className="text-sm">{like}</span>
          </div>
        </TooltipTrigger>
      ),
    },
    {
      name: "Comment",
      icon: (
        <TooltipTrigger onClick={handleCommentsClick} >
          <div className="flex flex-row justify-center items-center space-x-1 cursor-pointer hover:text-gray-500 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
            <MessageCircle className="hover:text-emerald-500" />
            <span className="text-sm">{comments}</span>
          </div>
        </TooltipTrigger>
      ),
    },
    {
      name: "Add to library",
      icon: (
        <TooltipTrigger onClick={toggleSavedButton}>
          <div className="flex flex-row justify-center items-center space-x-1 cursor-pointer hover:text-gray-500 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
            {isSaving ? (
              <Loader2 size={30} className="text-green-500 animate-spin" />
            ) : (
              saved ? (
                <BookmarkPlus
                  size={30}

                  className="text-green-500 " />
              ) : (
                <BookmarkIcon
                  size={30}
                  className="hover:text-yellow-400" />
              )
            )}
          </div>
        </TooltipTrigger>
      ),
    },
  ];

  return (
    <div className="flex flex-row justify-between items-center w-full mt-2">
      {blogActions.map((action, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            {action.icon}
            <TooltipContent>
              <p>{action.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default BlogCardActions;
