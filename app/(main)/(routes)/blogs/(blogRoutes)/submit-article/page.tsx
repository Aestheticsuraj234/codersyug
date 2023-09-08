"use client";
import React, { ChangeEvent, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

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
import { generateSlug } from "@/lib/generate-slug";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { Cross, X } from 'lucide-react';

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
    })
})

const SubmitArticle = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { startUpload } = useUploadThing("media");
    const [files, setFiles] = useState<File[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            thumbnail: "",
            category: "",
            subCategory: ""
        }
    })

    async function onSubmit(values: any) {
        const blob = values.thumbnail;
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);

            if (imgRes && imgRes[0].url) {
                values.thumbnail = imgRes[0].url; // Update the thumbnail with the uploaded image URL
            }
        }

        // Now you can submit the form values including the updated thumbnail URL
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        });
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

    if (!isMounted) setIsMounted(true);

    return (
        <div className='mt-20 flex flex-col items-start justify-start mx-10 w-full'>
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
                                <Input value={generateSlug(form.getValues().title || '')} readOnly />
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
                                            <X className='absolute top-10 right-0 w-12 h-12 text-red-500' onClick={() => field.onChange('')} />
                                            
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

                        <Button type="submit" className="w-full mb-4    ">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SubmitArticle;
