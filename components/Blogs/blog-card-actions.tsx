import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookmarkIcon, Heart, MessageCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { currentProfile } from "@/lib/current-profile";
import { toast } from "../ui/use-toast";

interface IdsProps {
  blogId: null | undefined | string | number;
  likes: number;
}

const BlogCardActions = ({ blogId, likes }: IdsProps) => {
  const [like, setLikes] = useState(likes);
  const [comments, setComments] = useState(0);
  const [isLiking, setIsLiking] = useState(false); // State to track if the user is liking the post
  const [isLiked, setIsLiked] = useState(false); // State to track if the user has liked the post
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<any | null>(null); // State to store the user's profile

  useEffect(() => {
    // Fetch the user's profile when the component mounts
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
  // Function to handle Likes and call the endpoint to increment the count in the database
  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      const res = await axios.post("http://localhost:3000/api/blog/like", {
        blogId: blogId,
      });
      const data = res.data.likes;

      // Client-side validation: Ensure the like count doesn't go below 0
      if (data >= 0) {
        setLikes(data);
        setIsLiked(!isLiked);
        toast({
          title: "Success",
          description: isLiked ? "Blog Unliked Successfully" : "Blog Liked Successfully",
        });
      } else {
        // Handle the case where the server returned a negative like count
        console.error("Server returned a negative like count");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentClick = () => {
    // Call the comment endpoint here if needed
    setComments(comments + 1);
  };

  const handleSaveClick = () => {
    // Call the save endpoint here if needed
    setSaved(!saved);
  };

  const blogActions = [
    {
      name: "Like",
      icon: (
        <TooltipTrigger onClick={handleLikeClick}>
          <div className="flex flex-row justify-center items-center space-x-1 cursor-pointer hover:text-gray-500 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
            {isLiking ? <Loader2 
              className="animate-spin
              text-gray-500
              hover:text-rose-500
           
              "
            /> : (
              <Heart
                className={isLiked ? "text-red-500" : "hover:text-rose-500"}
              />
            )}
            <span className="text-sm">{like}</span>
          </div>
        </TooltipTrigger>
      ),
    },
    {
      name: "Comment",
      icon: (
        <TooltipTrigger onClick={handleCommentClick}>
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
            <BookmarkIcon className="hover:text-yellow-400" />
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
