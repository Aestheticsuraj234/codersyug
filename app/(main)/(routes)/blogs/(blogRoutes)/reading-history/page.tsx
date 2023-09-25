"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import VisitedCard from "@/components/Blogs/Comments/visited-blog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

// Define a more descriptive type for each reading history item
interface ReadingHistoryItem {
  blog: {
    author: {
      id: number;
      userId: string;
      name: string;
      email: string;
      imageUrl: string;
    }
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    readTime: string;
  };
  blogId: number;
  createdAt: string;
  id: number;
  updatedAt: string;
  visitor: {
    id: number;
    userId: string;
    name: string;
    email: string;
    imageUrl: string;
  };
  visitorId: number;
}

const ReadingHistory = () => {
  const [visitedData, setVisitedData] = useState<ReadingHistoryItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    const getVisitedData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/blog/getReadingHistory");
        setVisitedData(res.data);
        setIsFetching(false);

        toast({
          title: "Success",
          description: "Data Fetched",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Data Fetching Failed",
        });
        setIsFetching(false);
      }
    };

    getVisitedData();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    setIsMounted(true);
  }

  return (
    <div className="mt-20 mx-4 mb-10 flex-1 w-full justify-center items-center">
      <h1 className="
        font-bold 
        text-start
        text-xl 
        bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400
        ">
        Reading History
      </h1>
      {
        isFetching ? (
          <div className="flex items-center justify-center">

            <Loader2 className="w-10 h-10 text-gray-700 dark:text-gray-300 animate-spin" />
          </div>
        )
          :
          <Command className="rounded-lg border shadow-md ">
            <CommandInput placeholder="Search Reading History..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {visitedData.map((history) => (
                <CommandGroup className="h-full" heading={
                  <span className="text-sm font-semibold">
                    {formatDate(history.createdAt)}
                  </span>
                } key={history.id}>
                  <CommandItem>
                    <VisitedCard
                      slug={history.blog.slug}
                      imageUrl={history.blog.thumbnail}
                      title={history.blog.title}
                      avatarImageUrl={history.blog.author.imageUrl}
                      authorName={history.visitor.name}
                      readTime={history.blog.readTime}

                    />
                  </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
      }

    </div>
  );
};

export default ReadingHistory;
