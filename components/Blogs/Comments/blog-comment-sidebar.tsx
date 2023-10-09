"use client"
import React, { useState, useContext } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs"
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Link2Icon, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import UserCommentCards from './user-comment-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import CurrentUserComment from './CurrentUserComment';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { AppContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
    comment: z.string().min(1, "Comment must be atleast 5 character long"),
})


const BlogCommentSidebar = () => {
    const { user } = useUser();
    const router = useRouter();
    const { blog } = useContext(AppContext);
    const { memoizedBlogData ,blogData} = blog;


    const [isSubmiting, setIsSubmiting] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            comment: "",
        }
    })

    const commentsLength = blogData?.comments?.length;

    async function onSubmit(values: any) {
        try {
            setIsSubmiting(true);
            const res = await axios.post('/api/blog/comment', {
                comment: values.comment,
                blogId: blogData?.id
            })
            console.log(res.data);
            setIsSubmiting(false);
            toast(
                {
                    title: "Comment Added",
                    description: "If Your Comment is Not Visible then reload the Page Kindly😎",
                }

            )
            router.refresh();
            form.reset();
        } catch (error) {

            console.error("Error creating blog:", error);
            toast({
                title: "Error",
                description: "Something went wrong",
            })
            router.refresh();
            form.reset();
            setIsSubmiting(false);
        }
        finally {
            router.refresh();
            form.reset();
            setIsSubmiting(false);
        }
    }



    return (
        <>
            <h1 className='absolute top-4 text-sm text-zinc-700 dark:text-zinc-100 font-semibold'>Comments({commentsLength})</h1>
            <ScrollArea className='w-full h-auto flex flex-col justify-start items-start space-y-5'>
                <div>
                    <div className="flex flex-row justify-start items-center gap-2 mb-8">
                        <CurrentUserComment
                            imageUrl={user?.imageUrl as string}
                            name={user?.fullName as string}
                        />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mb-4">
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Add Your Comment</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Write Your Comment🚀" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex flex-row justify-between items-center w-full'>
                                <Link href={"/code-of-code"}>
                                    <p
                                        className='inline-flex gap-3 justify-center items-center hover:underline text-zinc-700 dark:text-zinc-100 font-semibold text-xs   hover:text-zinc-600 dark:hover:text-zinc-200     cursor-pointer
                '>
                                        <Link2Icon />
                                        Code Of Conduct
                                    </p>
                                </Link>
                                <Button variant={"default"} size={"default"} type='submit'>
                                    {isSubmiting ? <Loader2 className='text-zinc-700 dark:text-zinc-100  animate-spin' /> : "Submit"}
                                </Button>
                            </div>
                        </form>

                    </Form>


                </div>
                <Separator className='w-full mb-5' />
                <UserCommentCards />
            </ScrollArea>
        </>
    );
};

export default BlogCommentSidebar;
