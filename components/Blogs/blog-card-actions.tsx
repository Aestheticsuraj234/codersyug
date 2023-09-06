import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookmarkIcon, Heart, MessageCircle, Share } from "lucide-react";

// Blog card actions like, comment, share, add to library
const blogActions = [
  {
    name: "Like",
    icon: <Heart className="hover:text-rose-500" />,
    onclick: () => console.log("Liked"),
  },
  {
    name: "Comment",
    icon: <MessageCircle className="hover:text-emerald-500" />,
    onclick: () => console.log("Commented"),
  },
 
  {
    name: "Add to library",
    icon: <BookmarkIcon className="hover:text-yellow-400" />,
    onclick: () => console.log("Added to library"),
  },
];

const BlogCardActions = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full mt-2">
      {blogActions.map((action, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>{action.icon}</TooltipTrigger>
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
