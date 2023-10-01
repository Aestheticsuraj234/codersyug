"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { FlagTriangleRight, Loader2, MoreVerticalIcon, Pencil, Trash2 } from 'lucide-react'
import { currentUser, useUser } from '@clerk/nextjs'
import { deleteResource } from '@/server-action/action'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { set } from 'zod'
interface resourceCardProps {
  id: number
  title: string
  image: string
  downloadNumber: number
  downloadLink: string
  type: string
  slug: string
  author: any
}

const ResourceCard = ({
  id,
  title,
  image,
  downloadNumber,
  downloadLink,
  type,
  slug,
  author
}: resourceCardProps) => {

  const { user } = useUser();
  const isAdmin = author?.userId === user?.id;
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter()
  const handleResourceDelete = async (id: number) => {
    try {
      setIsDelete(true);
      const deletedResource = await deleteResource(id);
      console.log("Resource deleted successfully:", deletedResource);
      setIsDelete(false);
      router.refresh()
      // Optionally, you can trigger any additional actions after successful deletion here.
    } catch (error) {
      console.error("Error deleting resource:", error);
      setIsDelete(false);
      // Handle errors here if needed.
    }
  }
  return (
    <Card className='w-full max-w-fit border-0 !bg-transparent sm:max-w-[356px]'>
      <div className='flex w-full justify-end items-center flex-1'>
      <Popover>
        <PopoverTrigger>
          <Button variant='ghost' size='icon' className='mx-2'>
            <MoreVerticalIcon className='h-5 w-5 text-zinc-600 float-right' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='end'
          sideOffset={5}
          className='bg-white dark:bg-zinc-900 flex flex-col items-start justify-start'>
          {isAdmin


            ? (
              <>
                <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                  <Pencil className='w-5 h-5 hover:text-green-400 text-zinc-500' />
                  Edit <Badge variant='default' className='ml-2'>Soon!</Badge>
                </Button>
                <Button onClick={() => handleResourceDelete(id)} variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                  {isDelete ? <Loader2
                    className="animate-spin w-5 h-5 hover:text-red-700 text-zinc-500"

                  /> : (<> <Trash2 className='w-5 h-5 hover:text-red-700 text-zinc-500' />
                    Delete</>)}
                </Button>
              </>
            ) : (
              <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                <FlagTriangleRight className='h-5 w-5 hover:text-red-500 text-zinc-500' />
                Report <Badge variant='default' className='ml-2'>Soon</Badge>
              </Button>
            )}
        </PopoverContent>
      </Popover>
      </div>
      <Link href={`/resources/${slug}`}  >
        <CardHeader className="flex-center flex-col gap-2.5 !p-0">
          <div className="h-fit w-full relative">
            <Image
              src={image}
              className="h-full rounded-md object-cover"
              width={384}
              height={440}
              alt={title}
            />

          </div>
          <CardTitle className=" paragraph-semibold line-clamp-1 w-full text-left">{title}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent className="flex-between mt-4 p-0">
        <div className="flex-center body-medium gap-1.5 ">
          <Image
            src="/downloads.svg" width={20} height={20} alt="download"
          />
          {downloadNumber}
          <Badge className='
           
            bg-gradient-to-r dark:from-pink-300 dark:via-purple-300 dark:to-indigo-400  
            from-gray-700 via-gray-900 to-black
           ml-2
           
               '>
            {type}
          </Badge>
        </div>
        <Link href={`/resources/${slug}`} className="flex-center text-gradient_purple-blue body-semibold gap-1.5">
          Download Now
          <Image src="/arrow-blue.svg" width={13} height={10} alt="arrow" />
        </Link>
      </CardContent>

    </Card>

  )
}

export default ResourceCard