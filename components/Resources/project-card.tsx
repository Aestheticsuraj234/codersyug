"use client"
import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '../ui/button';
import { Download, FlagTriangleRight, Gift, Github, Globe2, Loader2, LockIcon, MoreVerticalIcon, Pencil, Trash2, Unlock } from 'lucide-react';
import { currentUser, useUser } from '@clerk/nextjs';
import { deleteResource, isResourcePurchasedByCurrentUser } from '@/server-action/action';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResourceAccessType } from '@prisma/client';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { set } from 'zod';
import { Separator } from '../ui/separator';



interface projectCardProps {
    Title: string;
    Thumbnail: string;
    TechStacks: string[];
    type: string;
    slug: string;
    price: number;
    accessType: string;
    previewLink: string;
    sourceCodeLink: string;
    author: any;
    downloadNumber: number;

}

const ProjectCard = ({
    Title,
    Thumbnail,
    TechStacks,
    type,
    slug,
    price,
    accessType,
    previewLink,
    sourceCodeLink,
    author,
    downloadNumber

}: projectCardProps) => {
    const { user } = useUser();

    const isAdmin = author?.userId === user?.id;
    const [isDelete, setIsDelete] = useState(false);
    const [isResourceUnlocked, setIsResourceUnlocked] = useState<boolean>(false);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const isResourceUnlockedByCurrentUser = async () => {
        try {
            const resource = await isResourcePurchasedByCurrentUser(slug);
            setIsResourceUnlocked(!!resource);

        } catch (error) {
            console.error("Error fetching resource:", error);
        }
    }

    useEffect(() => {
        isResourceUnlockedByCurrentUser();
    }, []);





    return (
        <Card className='w-full max-w-fit border-0 bg-white shadow-md rounded-md dark:bg-zinc-800 p-4 sm:max-w-[356px]'>

            <CardHeader className="flex-center flex-col gap-2.5 !p-0 mb-3">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        src={Thumbnail}
                        className="duration-700 ease-in-out scale-100 blur-0 grayscale-0 object-cover"
                        fill
                        alt={Title}
                    />
                </div>
                <div className="overflow-x-auto max-w-full">
                    <ScrollArea className="no-scrollbar">
                        <ul className="dark:text-zinc-100 text-zinc-800 text-xs no-scrollbar flex gap-2 py-2 sm:max-w-md">
                            {TechStacks && TechStacks?.map((techstack: string) => (
                                <button
                                    key={techstack}

                                    className={`bg-gradient-to-r mb-4 from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 text-white font-normal whitespace-nowrap rounded-lg px-2 py-1 capitalize `}
                                >
                                    {techstack}
                                </button>
                            ))}
                            <ScrollBar orientation="horizontal" />
                        </ul>
                    </ScrollArea>
                </div>
                <div className='flex-between w-full'>
                    <Link href={`/resources/#`}> <CardTitle className="paragraph-semibold line-clamp-1 w-full text-left hover:underline">{Title}</CardTitle></Link>
                    <Popover>
                        <PopoverTrigger>
                            <Button variant='ghost' size='icon' className='mx-2'>
                                <MoreVerticalIcon className='h-5 w-5 text-zinc-600 float-right' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align='center'
                            sideOffset={5}
                            className='bg-white dark:bg-zinc-900 flex flex-col items-start justify-start w-full'>
                            {isAdmin
                                ? (
                                    <>
                                        <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
                                            <Pencil className='w-5 h-5 hover:text-green-400 text-zinc-500' />
                                            Edit <Badge variant='default' className='ml-2'>Soon!</Badge>
                                        </Button>
                                        <Button variant='ghost' size='default' className='flex flex-row justify-center items-center gap-2'>
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

                <div className='flex-between flex-row w-full'>
                    <Badge variant='outline' className='ml-2 h-8' >{type}</Badge>
                    <Badge variant='outline' className='ml-2 h-8'>{accessType}</Badge>
                    {
                        accessType === ResourceAccessType.FREE ? (
                            <Badge variant={"free"} className='h-8'><div className='flex justify-center items-center gap-2 flex-row'>
                                <Gift size={16} className='text-xs' />
                                <p>Free</p>
                            </div></Badge>
                        ) : (
                            <Badge variant={`${isResourceUnlocked ? "destructive" : "paid"}`} className='h-8'>
                                {isResourceUnlocked ? (
                                    <div className='flex justify-center items-center gap-2 flex-row'>
                                        <Unlock size={16} className='text-xs' />
                                        <p>Unlocked</p>
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center gap-2 flex-row'>
                                        <LockIcon size={16} className='text-xs' />
                                        <p>locked</p>
                                    </div>
                                )}
                            </Badge>
                        )
                    }

                </div>
            </CardHeader>
            <Separator />
            <CardContent className='flex-between flex-row w-full mt-4'>
                <Button size={"lg"} shape={"default"} className='flex-center ' >
                    <Download size={16} className='text-xs ' />
                    <p>{downloadNumber}</p>

                </Button>
                <Button size={"icon"} shape={"circle"} disabled={accessType===ResourceAccessType.PAID} >
                    <Github size={16} className='text-xs' />
                </Button>
                <Button size={"icon"} shape={"circle"} >
                    <Globe2 size={16} className='text-xs' />
                </Button>



            </CardContent>
        </Card>
    )
}

export default ProjectCard