"use client";
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { FileUpload } from '@/components/image-uploader';

// Form Schema (using Zod)

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




const SubMitArticles = () => {
    const [isMounted, setIsMounted] = useState(false)

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

    function onSubmit(data: any): any {
        const title = form.getValues().title;
        const slug = title ? generateSlug(title) : ''; // Check if title is defined

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify({ ...data, slug }, null, 2)}</code>
                </pre>
            ),
        })
    }

    if (!isMounted) setIsMounted(true)

    return (
        <div className='mt-20 flex flex-col items-start justify-start mx-10 w-full'>
            <h1 className='text-3xl font-extrabold bg-gradient-to-r from-gray-700 text-center mb-2 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent'>Publish Your Own Blog</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    {/* Title Field */}
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

                    {/* Description Field */}
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
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thumbnail URL</FormLabel>
                                <FormControl>

                                    <FileUpload
                                        endpoint="serverImage"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter a valid URL for the thumbnail image.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Category Field */}
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
                                    Enter a category (at least 3 characters).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Subcategory Field */}
                    <FormField
                        control={form.control}
                        name="subCategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subcategory</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter subcategory" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter a subcategory (at least 3 characters).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default SubMitArticles;
