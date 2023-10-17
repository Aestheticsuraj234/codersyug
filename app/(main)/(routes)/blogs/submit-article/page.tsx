"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { slugify } from '@/lib/utils';
import { uploadFiles, useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { X } from 'lucide-react';

import { Loader2Icon } from 'lucide-react';
import BlogBottomBar from '@/components/Blogs/mobile-blog-bottombar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BlogType } from '@prisma/client';
import { useRouter } from 'next/navigation';

import EditorJS from '@editorjs/editorjs';
import Editor from '@/components/editor';




const FormSchema = z.object({
    title: z.string().min(10, {
        message: "Title must be at least 10 characters.",
    }),

    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    BlogUrl: z.string().min(0, {
        message: "BlogUrl must be a valid URL.",
    }),
    thumbnail: z.string().url({
        message: "Thumbnail must be a valid URL.",
    }),
    category: z.string().min(3, {
        message: "Category must be at least 3 characters.",
    }),
    subCategory: z.string().min(3, {
        message: "Sub Category must be at least 3 characters.",
    }),
    content: z.any().optional(),
    BlogType: z.string().min(1, {
        message: "AccessType must be selected.",
    }),
})


const blogTypeArray = Object.values(BlogType);



const SubmitArticle = () => {
   
    const { startUpload } = useUploadThing("media");
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter()
    const [isSubmitted, setIsSubmitted] = useState(false);
    const editorRef = useRef<EditorJS | null>(null);




    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            BlogUrl: "",
            BlogType: "",
            description: "",
            thumbnail: "",
            category: "",
            subCategory: "",
            content: null,
        }
    })

    async function onSubmit(values: any) {
        try {
            setIsSubmitted(true);

            if (editorRef.current) {
                const content = await editorRef.current.save();
                values.content = content; // Set the content field with the JSON content
            }

            const blob = values.thumbnail;
            const hasImageChanged = isBase64Image(blob);
            if (hasImageChanged) {
                const imgRes = await startUpload(files);

                if (imgRes && imgRes[0].url) {
                    values.thumbnail = imgRes[0].url; // Update the thumbnail with the uploaded image URL
                }
            }

            const response = await axios.post("/api/blog", {
                title: values.title,
                slug: values.BlogType === BlogType.New ? slugify(values.title) : null,
                BlogUrl: values.BlogType === BlogType.Existing ? values.BlogUrl : null,
                blogType: values.BlogType,
                description: values.description,
                thumbnail: values.thumbnail,
                category: values.category,
                subCategory: values.subCategory,
                content: JSON.stringify(values.content), // Ensure that values.content is a string
                BlogType: values.BlogType,
            });

            console.log(response.data);
            if (response.status === 201) {
                setIsSubmitted(false);
                toast({
                    title: "Article Submitted Successfully",
                    description: "Your article has been submitted successfully.",
                });
            } else {
                console.log('Request failed:', response.status, response.statusText);
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setIsSubmitted(false);
            form.reset();
            router.refresh();
        }
    }



    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };




    return (
        <div className='mt-20 flex flex-col items-center justify-center mx-10 '>
            <h1 className='text-3xl font-extrabold bg-gradient-to-r from-gray-700 text-center mb-2 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent'>Publish Your Own Blog</h1>
            <div className='flex flex-col  space-y-4 w-full mt-10'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full  space-y-6 mb-10">
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a title for your article (at least 10 characters).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="BlogType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blog Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Access Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <ScrollArea className="no-scrollbar h-44 w-auto">
                                                    <SelectGroup>
                                                        <SelectLabel>Blog-Type</SelectLabel>
                                                        {blogTypeArray.map((blogtype) => {
                                                            return (
                                                                <SelectItem
                                                                    key={blogtype}
                                                                    {...field}
                                                                    value={blogtype}
                                                                >
                                                                    {blogtype}
                                                                </SelectItem>
                                                            )
                                                        })}
                                                    </SelectGroup>
                                                </ScrollArea>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.BlogType?.message}</FormMessage>
                                </FormItem>
                            )}
                        />


                        {form.watch("BlogType") === BlogType.New && (<FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input value={slugify(form.getValues().title || '')} readOnly />
                            </FormControl>
                            <FormDescription>
                                The slug will be auto-generated based on the title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>)
                        }

                        {
                            form.watch("BlogType") === BlogType.Existing && (<FormField
                                control={form.control}
                                name="BlogUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>BlogUrl</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter BlogUrl" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter a BlogUrl for your article (at least 10 characters).
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />)
                        }



                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a description (at least 10 characters).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Thumbnail Field */}
                        <FormField
                            control={form.control}
                            name='thumbnail'
                            render={({ field }) => (
                                <FormItem className='flex items-center justify-center gap-4  flex-col'>
                                    <FormLabel className='relative'>
                                        {field.value ? (
                                            <>
                                                <Image
                                                    src={field.value}
                                                    alt='profile_icon'
                                                    width={288}
                                                    height={152}
                                                    priority
                                                    className=' object-contain'
                                                />
                                                <X className='absolute top-10 right-0 w-6 h-6 bg-red-500 text-white rounded-full' onClick={() => field.onChange('')} />

                                            </>
                                        ) : (
                                            <Image
                                                src='/assests/blogging.svg'
                                                alt='profile_icon'
                                                width={288}
                                                height={152}
                                                className='object-contain'
                                            />
                                        )}
                                    </FormLabel>
                                    <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                        <Input
                                            type='file'
                                            accept='image/*'
                                            placeholder='Add profile photo'
                                            className='account-form_image-input'
                                            onChange={(e) => handleImage(e, field.onChange)}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Upload Your Thumbnail from here.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter category" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a category for your article (at least 3 characters).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Sub Category */}
                        <FormField
                            control={form.control}
                            name="subCategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sub Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter sub-category" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a sub-category for your article (at least 3 characters).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Rich text */}
                        {form.watch("BlogType") === BlogType.New && (
                            <FormField
                                control={form.control}
                                name="content"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Write Your Content</FormLabel>
                                        <FormControl>
                                            {/* @ts-ignore */}
                                            <Editor editorRef={editorRef} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the content for your article (at least 10 characters).
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        )
                        }
                        <Button type="submit" className="w-full mb-4 font-bold">
                            {
                                isSubmitted ? (
                                    <Loader2Icon className="animate-spin" size={24} />
                                ) : (
                                    "Submit Article"
                                )

                            }
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="md:hidden items-center justify-center flex text-center mx-4 ">
                <BlogBottomBar />
            </div>
        </div>
    )
}

export default SubmitArticle;
