"use client";
import React, { useContext, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import {
  Button
} from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader
} from '@/components/ui/card';
import {
  FlagTriangleRight,
  MoreVerticalIcon,
  Pencil,
  Trash2
} from 'lucide-react';
import { AppContext } from '@/context/GlobalContext';
import { formatDate } from '@/lib/utils';
import { useUser } from "@clerk/nextjs"


const UserCommentCard = () => {
  const { blog } = useContext(AppContext);
  const { blogData } = blog;
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  console.log(blogData?.comments, "Comments_client");


  const isAdmin = blogData?.author?.userId === user?.id;




  if (!isMounted) {
    setIsMounted(true);
  }
  return (
    blogData?.comments.map((comment: any) => (
      <Card key={comment.id} className='w-full h-auto flex flex-col justify-start items-start mb-10'>
        <div className='flex flex-row w-full justify-between items-center'>
          <div className='flex flex-row justify-center items-center'>
            <CardHeader>
              <Avatar>
                <AvatarImage src={comment?.commenter?.imageUrl} />
                <AvatarFallback>{comment?.commenter?.name.charAt[0]}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <div className='flex flex-col justify-start items-start'>
              <p className="text-zinc-600 dark:text-zinc-100 font-bold text-sm">
                {comment?.commenter?.name}
              </p>
              <span className="text-zinc-400 dark:text-zinc-100 font-semibold text-xs">
                {
                  formatDate(comment?.createdAt)
                }
              </span>
            </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <Button variant='ghost' size='icon' className='mx-2'>
                <MoreVerticalIcon className='h-5 w-5 text-zinc-600' />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align='end'
              sideOffset={5}
              className='bg-white dark:bg-zinc-900 flex flex-col items-start justify-start'>
              {isAdmin ||
                comment?.commenter?.userId === user?.id

                ? (
                  <>
                    <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                      <Pencil className='w-5 h-5 hover:text-green-400 text-zinc-500' />
                      Edit
                    </Button>
                    <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                      <Trash2 className='w-5 h-5 hover:text-red-700 text-zinc-500' />
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                    <FlagTriangleRight className='h-5 w-5 hover:text-red-500 text-zinc-500' />
                    Report
                  </Button>
                )}
            </PopoverContent>
          </Popover>
        </div>
        <CardDescription className='p-4'>
          <p className="text-zinc-600 dark:text-zinc-100 font-semibold text-sm">
            {
              comment?.text
            }
          </p>
        </CardDescription>
      </Card>
    ))

  );
};

export default UserCommentCard;
