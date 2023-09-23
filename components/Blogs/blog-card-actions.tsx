"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookmarkIcon, Heart, MessageCircle, Loader2, BookMarked, BookmarkPlus } from "lucide-react";
import axios from "axios";
import { currentProfile } from "@/lib/current-profile";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/GlobalContext";

interface IdsProps {
  blogId: null | undefined | string | number;
  likes: number;
  likedBy: number[];
  comment: number;
  slug: string;
}

const BlogCardActions = ({ blogId, likes, likedBy, comment, slug }: IdsProps) => {
  const router = useRouter();
  const { blog } = useContext(AppContext);
  const { memoizedBlogData } = blog; // Ensure that you're using the correct variable

  const [like, setLikes] = useState(likes);
  const [comments, setComments] = useState(comment);
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await currentProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    getSaved(blogId);
  }, [blogId]);

  useEffect(() => {
    if (likedBy.includes(profile?.userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedBy, profile?.userId]);

  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      const res = await axios.post("http://localhost:3000/api/blog/like", {
        blogId: blogId,
      });
      const data = res.data.likes;

      if (data >= 0) {
        setLikes(data);
        setIsLiked(!isLiked);

        toast({
          title: "Success",
          description: isLiked ? "Blog Unliked Successfully" : "Blog Liked Successfully",
        });
      } else {
        console.error("Server returned a negative like count");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLiking(false);
    }
  };

  const getSaved = async (blogId: any) => {
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

  const handleSaveClick = async () => {
    try {
      setIsSaving(true);

      const res = await axios.put("http://localhost:3000/api/blog", {
        blogId: blogId,
      });

      if (res.status === 200) {
        setSaved(true);
        toast({
          title: "Success",
          description: "Blog Saved Successfully",
        });
        setIsSaving(false);
      } else if (res.status === 201) {
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

  const handleCommentsClick = () => {
    router.push(`/blogs/${slug}`);
  }

  const blogActions = [
    {
      name: "Like",
      icon: (
        <TooltipTrigger onClick={handleLikeClick}>
          <div className="flex flex-row justify-center items-center space-x-1 cursor-pointer hover:text-gray-500 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
            {isLiking ? (
              <Loader2 className="animate-spin text-gray-500 hover:text-rose-500" />
            ) : (
              <Heart className={"text-gray-500"} />
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
        <TooltipTrigger onClick={handleSaveClick}>
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
