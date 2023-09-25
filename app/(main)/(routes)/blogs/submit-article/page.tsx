"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { X } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { Loader2Icon } from 'lucide-react';


const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className="flex justify-center items-center h-64"><Loader2Icon className="animate-spin" size={64} /></div>,
});

// Define a props interface for QuillEditor
interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    modules: Record<string, unknown>; // You can define a more specific type for modules if needed
    formats: string[];
    className?: string;
}
const QuillEditor = ({ value, onChange, modules, formats, className }: QuillEditorProps) => {
    const handleChange = (html: string) => {
        onChange(html); // Call the onChange callback with the HTML content
    };

    return (
        <QuillNoSSRWrapper
            value={value}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            className={className}
            theme="snow"
        />
    );
};



const FormSchema = z.object({
    title: z.string().min(10, {
        message: "Title must be at least 10 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
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
    content: z.string().min(10, {
        message: "Content must be at least 10 characters.",
    })
})

const SubmitArticle = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { startUpload } = useUploadThing("media");
    const [files, setFiles] = useState<File[]>([]);
    const [editorState, setEditorState] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean'],
            [{ 'background': [] }, { 'color': [] }, { 'font': [] }, { 'code': [] }, { 'script': 'super' }, { 'script': 'sub' }],
            ['blockquote', 'indent', 'list'],
            [{ 'align': [] }, { 'direction': 'rtl' }],
            ['code-block'],
            [{ 'formula': 'formula' }],
            [{ syntax: true }],
        ],
    };

    const formats = [
        'header', 'font', 'list', 'bold', 'italic', 'underline', 'strike',
        'align', 'link', 'image', 'video', 'clean', 'background', 'color', 'code',
        'script', 'blockquote', 'indent', 'direction', 'code-block', 'formula',
    ];

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            thumbnail: "",
            category: "",
            subCategory: "",
            content: editorState, // Initialize content with an empty string
        }
    })

    async function onSubmit(values: any) {
        try {
            setIsSubmitted(true);
            const blob = values.thumbnail;
            const hasImageChanged = isBase64Image(blob);
            if (hasImageChanged) {
                const imgRes = await startUpload(files);

                if (imgRes && imgRes[0].url) {
                    values.thumbnail = imgRes[0].url; // Update the thumbnail with the uploaded image URL
                }
            }

            const response = await axios.post('http://localhost:3000/api/blog', {
                title: values.title,
                slug: slugify(values.title),
                description: values.description,
                thumbnail: values.thumbnail,
                category: values.category,
                subCategory: values.subCategory,
                content: values.content,
            });

            console.log(response);

            if (response.status === 201) {
                setIsSubmitted(false);
                toast({
                    title: "Article Submitted Successfully",
                    description: "Your article has been submitted successfully.",
                });
                form.reset();
            } else {
                console.log('Request failed:', response.status, response.statusText);
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
                form.reset();
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
    const handleContent = (
        value: any,
        fieldChange: (value: string) => void) => {
        setEditorState(value);
        fieldChange(value);




    };

    if (!isMounted) setIsMounted(true);

    return (
        <div className='mt-20 flex flex-col items-center justify-center mx-10 '>
            <h1 className='text-3xl font-extrabold bg-gradient-to-r from-gray-700 text-center mb-2 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent'>Publish Your Own Blog</h1>
            <div className='flex flex-col  space-y-4 w-full mt-10'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mb-10">
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

                        {/* Slug Field (Auto-generated) */}
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input value={slugify(form.getValues().title || '')} readOnly />
                            </FormControl>
                            <FormDescription>
                                The slug will be auto-generated based on the title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>

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
                                <FormItem className='flex items-start justify-start gap-4  flex-col'>
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
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Write Your Content</FormLabel>
                                    <FormControl>
                                        <QuillEditor
                                            value={field.value} // Pass editorState as the value
                                            onChange={
                                                (value) => handleContent(value, field.onChange)

                                            } // Use the handleContent function
                                            modules={modules}
                                            formats={formats}
                                            className="bg-white dark:bg-black dark:text-white rounded-md  h-96 overflow-y-auto  scrollbar-thumb-zinc-900 dark:scrollbar-thumb-zinc-100 dark:scrollbar-track-zinc-900  scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the content for your article (at least 10 characters).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
        </div>
    )
}

export default SubmitArticle;
