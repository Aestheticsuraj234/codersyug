import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookmarkIcon, Heart, MessageCircle } from "lucide-react";
import axios from "axios";
import { currentProfile } from "@/lib/current-profile";


interface IdsProps {
  blogId: null | undefined | string | number;
  likes: number;
}

const BlogCardActions = ({ blogId, likes }: IdsProps) => {
  const [like, setLikes] = useState(likes);
  const [comments, setComments] = useState(0);
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







  const blogActions = [
    {
      name: "Like",
      icon: <Heart className="hover:text-rose-500" />,
      count: like, // Add count property to track likes
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

  // Function to handle Likes and call the endpoint to increment the count in the database
  const handleLikeClick = async () => {
    try {

      const res = await axios.post("http://localhost:3000/api/blog/like", {
        blogId: blogId,
      });
      const data = res.data.likes;
      setLikes(data);

    } catch (error) {
      console.log(error);
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
