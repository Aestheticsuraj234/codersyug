"use client"
import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Link2Icon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import UserCommentCards from './user-comment-card';
import { ScrollArea } from '@/components/ui/scroll-area';


const FormSchema = z.object({
    comment: z.string().min(1, "Comment must be atleast 5 character long"),
})


const BlogCommentSidebar = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            comment: "",
        }
    })

    async function onSubmit(values: any) {
        try {
            console.log(values);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    }



    return (
        <ScrollArea>
        <div>
            <div className="flex flex-row justify-start items-start gap-2 mb-8">
                <Avatar>
                    <AvatarImage
                        src={`https://avatars.githubusercontent.com/u/7525670?v=${3}`}
                    />
                    <AvatarFallback>cn</AvatarFallback>
                </Avatar>
                <p className="text-zinc-700 dark:text-zinc-100 font-bold text-base">
                    Suraj Kumar Jha
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mb-4">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write Your Comment" inputMode='text' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter a title for your article (at least 10 characters).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-row justify-between items-center w-full'>
                        <Link href={"/code-of-code"}>
            <p 
                className=' inline-flex gap-3 justify-center items-center hover:underline
                text-zinc-700 dark:text-zinc-100 font-semibold text-xs
                hover:text-zinc-600 dark:hover:text-zinc-200
                cursor-pointer
                '>
                    <Link2Icon/>
                                Code Of Conduct
                            </p>
                        </Link>
                        <Button variant={"default"} size={"default"} type='submit'>
                            Comment
                        </Button>
                    </div>
                </form>

            </Form>


        </div>
       <Separator className='w-full mb-5'/>
       <UserCommentCards/>
       </ScrollArea>
    );
};

export default BlogCommentSidebar;
