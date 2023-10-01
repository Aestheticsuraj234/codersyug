"use client"
import React, { ChangeEvent, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, X } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";

import { useForm } from "react-hook-form";

import { isBase64Image, slugify } from "@/lib/utils";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Categories } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";


const formSchema = z.object({
    Title: z.string().min(10, {
        message: "Title must be at least 10 characters.",
    }),
    Slug: z.string().readonly(),
    Description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    Thumbnail: z.string().url({
        message: "Thumbnail must be a valid URL.",
    }),
    DownloadLink: z.string().url({
        message: "DownloadLink must be a valid URL.",
    }),
    category: z.string().min(1, {
        message: "Category must be selected.",
    })
});


// wanted to convert Categories object to array 

const categoriesArray = Object.values(Categories);

const CreateEbook = () => {

    const { startUpload } = useUploadThing("media");

    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Title: "",
            Slug: "",
            Description: "",
            Thumbnail: "",
            DownloadLink: "",
            category: "",
        },
    });

    const onSubmit = async (values: any) => {
        console.log(values);
        try {
            setIsSubmitting(true);

            const blob = values.thumbnail;
            const hasImageChanged = isBase64Image(blob);
            if (hasImageChanged) {
                const imgRes = await startUpload(files);

                if (imgRes && imgRes[0].url) {
                    values.thumbnail = imgRes[0].url; // Update the thumbnail with the uploaded image URL
                }
            }
            const response = await axios.post("/api/resources/create/ebook", {
                title: values.Title,
                slug: values.Slug,
                description: values.Description,
                thumbnail: values.Thumbnail,
                downloadLink: values.DownloadLink,
                category: values.category,
            })
            console.log(response.data);
            setIsSubmitting(false);

            if (response.status === 201) {
                setIsSubmitting(false);
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
            setIsSubmitting(false);
            console.error("Error:", error);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });


        }
        finally {
            setIsSubmitting(false);
            form.reset();
        }

    };

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
        <div className="mt-20 flex flex-col items-center justify-center mx-10 mb-10">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-gray-700 text-center mb-2 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                Publish E-Books For Community
            </h1>
            <div className="flex flex-col space-y-4 w-full mt-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="Title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Top Chrome Extensions that you should know" className="  !ring-0 !ring-offset-0 " {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter Your E-book Title
                                    </FormDescription>
                                    <FormMessage>{form.formState.errors.Title?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormItem >
                            <FormLabel>Slug</FormLabel>
                            <div className="flex flex-row justify-center items-center gap-2">
                                <FormControl>
                                    <Input
                                        value={form.getValues().Slug}
                                        readOnly
                                        className="!ring-0 !ring-offset-0 "
                                    />
                                </FormControl>

                                <Button

                                    onClick={() => {
                                        form.setValue("Slug", slugify(form.getValues().Title || ""));
                                    }}
                                >
                                    Generate
                                </Button>
                            </div>
                            <FormDescription>
                                Slug is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.
                            </FormDescription>
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="Thumbnail"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-center gap-4 flex-col">
                                    <FormLabel className="relative">
                                        {field.value ? (
                                            <>
                                                <Image
                                                    src={field.value}
                                                    alt="Thumbnail"
                                                    width={288}
                                                    height={152}
                                                    priority
                                                    className="object-contain"
                                                />
                                                <X
                                                    className="absolute top-10 right-0 w-6 h-6 bg-red-500 text-white rounded-full"
                                                    onClick={() => field.onChange("")}
                                                />
                                            </>
                                        ) : (
                                            <UploadCloud
                                                size={24}
                                                className="dark:text-zinc-100 text-zinc-800"
                                            />
                                        )}
                                    </FormLabel>
                                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            placeholder="Add Thumbnail"
                                            className="account-form_image-input !ring-0 !ring-offset-0 "
                                            onChange={(e) => handleImage(e, field.onChange)}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Upload Thumbnail for your E-book
                                    </FormDescription>
                                    <FormMessage>
                                        {form.formState.errors.Thumbnail?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="DownloadLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>DownloadLink</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://drive.google.com/file/d/1ld1sgmdiAcfJpjBxI5icMinWRxY-8AWi/view" {...field} className="!ring-0 !ring-offset-0 " />
                                    </FormControl>
                                    <FormDescription>
                                        Enter Your E-book DownloadLink
                                    </FormDescription>
                                    <FormMessage>{form.formState.errors.DownloadLink?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="Description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="17+ chapters packed with example source code" {...field} className="!ring-0 !ring-offset-0 " />
                                    </FormControl>
                                    <FormDescription>
                                        Enter Your E-book Description
                                    </FormDescription>
                                    <FormMessage>{form.formState.errors.Description?.message}</FormMessage>
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <ScrollArea className="no-scrollbar h-44 w-auto">
                                                    <SelectGroup>
                                                        <SelectLabel>Categories</SelectLabel>
                                                        {categoriesArray.map((category) => {
                                                            return (
                                                                <SelectItem
                                                                    key={category}
                                                                    {...field}
                                                                    value={category.toString()}
                                                                >
                                                                    {category}
                                                                </SelectItem>
                                                            )
                                                        })}
                                                    </SelectGroup>
                                                </ScrollArea>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.category?.message}</FormMessage>
                                </FormItem>
                            )}
                        />



                        {/* Other form fields go here */}
                        <Button type="submit" >{
                            isSubmitting ? <Loader2 className="animate-spin" /> : "Publish"
                        }</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateEbook;