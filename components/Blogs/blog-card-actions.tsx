import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookmarkIcon, Heart, MessageCircle } from "lucide-react";
import { currentProfile } from "@/lib/current-profile";
import { experimental_useOptimistic as useOptimistic } from "react";
import LikesTheBlog from "@/lib/server-actions/actions";


interface IdsProps {
  blogId: null | undefined | string | number;
  likes: number;
}

const BlogCardActions = ({ blogId, likes }: IdsProps) => {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (state: any, action) => state + action,
  );
  console.log("OPTIMISTIC_LIKES:= ",optimisticLikes);

  const [comments, setComments] = useState(0);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<any | null>(null); // State to store the user's profile
  const [isLiked, setIsLiked] = useState(false); // State to track if the user has liked the blog or not

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







  const blogActions = [
    {
      name: "Like",
      icon: <Heart className="hover:text-rose-500" />,
      count: optimisticLikes, // Add count property to track likes
    },
    {
      name: "Comment",
      icon: <MessageCircle className="hover:text-emerald-500" />,
      count: comments, // Add count property to track comments
    },
    {
      name: "Add to library",
      icon: <BookmarkIcon className="hover:text-yellow-400" />,
    },
  ];

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        // If already liked, decrement the count and set isLiked to false
        if (optimisticLikes === 0) return; // Avoid negative counts
        const action = -1;
        setOptimisticLikes(action); // Update the optimisticLikes
        setIsLiked(false);
        await LikesTheBlog(blogId); // You may need to pass an action parameter
      } else {
        // If not liked, increment the count and set isLiked to true
        const action = 1;
        setOptimisticLikes(action); // Update the optimisticLikes
        setIsLiked(true);
        await LikesTheBlog(blogId); // You may need to pass an action parameter
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const amount = 1;
  const handleCommentClick = () => {
    // Call the comment endpoint here if needed
    setComments(amount);
  };

  const handleSaveClick = () => {
    // Call the save endpoint here if needed
    setSaved(!saved);
  };

  return (
    <div className="flex flex-row justify-between items-center w-full mt-2">
      {blogActions.map((action, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger
              onClick={
                action.name === "Like"
                  ? handleLikeClick
                  : action.name === "Comment"
                    ? handleCommentClick
                    : handleSaveClick
              }
            >
              <div className="flex flex-row justify-center items-center space-x-1 cursor-pointer hover:text-gray-500 transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
                {action.icon}
                {action.count !== undefined && (
                  <span className="text-sm">{action.count}</span>
                )}
              </div>
            </TooltipTrigger>
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
