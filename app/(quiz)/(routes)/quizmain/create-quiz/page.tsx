"use client"

// ?##################################_🔥React_Imports_🔥##################################

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ?#################################_React-Hook-Form-Impots🔪##################################
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";

// ?#################################🥇Icon_Imports🥇##################################
import { Activity, Calendar as CalendarIcon, CheckCircle, LayoutDashboard, ListChecks, ListTodo, Loader2, MinusCircle, PlusCircle, SheetIcon, Timer, UploadCloud, X } from "lucide-react";

// ?################################👑Utils_Imports#####################################
import { Level } from "@prisma/client";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// ?###################🎊Shadcn_UI_Components_Imports🎊#####################################
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconBadge } from "@/components/Global/icon-badge";
import axios from "axios";
import { BsQuestionCircle } from "react-icons/bs";




// ?###########################🚀Form-Schema🚀############################################
const formSchema = z.object({
    Title: z.string().min(10, {
        message: "Title must be at least 10 characters.",
    }),
    Description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    Thumbnail: z.string().url({
        message: "Thumbnail must be a valid URL.",
    }),
    Level: z.string().min(1, {
        message: "Level must be selected.",
    }),
    NumberOfDay: z.string().min(1, {
        message: "Number of Days must be selected.",
    }),
    StartDate: z.date({
        required_error: "A start date is required.",
    }),
    EndDate: z.date({
        required_error: "An end date is required.",
    }),
    questions: z.array(
        z.object({
            questionTitle: z.string().min(1),
            options: z.array(z.string()).min(2).max(4),
            correctOption: z.string(),
            timer: z.string().min(1).max(60),
        })
    ),
});



//convert Categories object to array 

const LevelArray = Object.values(Level);


const CreateQuiz = () => {
    // ?#################################🔥State_Variables🔥#####################################
    const { startUpload } = useUploadThing("media");
    const [date, setDate] = useState<Date>()
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);



    // !#################################🔥React_Hook_Form🔥#####################################

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Title: "",
            Description: "",
            Thumbnail: "",
            Level: "",
            NumberOfDay: "1",
            StartDate: new Date(),
            EndDate: new Date(),
            questions: [
                {
                    questionTitle: '',
                    options: ['', '', '', ''],
                    correctOption: '', // Default to the first option
                    timer: "30",
                },
            ],
        },
    });

    const control = form.control;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });


    // !#################################👩‍💻Functions👩‍💻#####################################

    const toggleCreating = () => {
        setIsCreating((current) => !current);
    };

    const addQuestion = () => {
        append({
            questionTitle: '',
            options: ['', '', '', ''],
            correctOption: '', // Default to the first option
            timer: "30",
        });
    };

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
            const response = await axios.post("/api/quiz/create", {
                Title: values.Title,
                Description: values.Description,
                Thumbnail: values.Thumbnail,
                Level: values.Level,
                NumberOfDay: values.NumberOfDay,
                StartDate: values.StartDate,
                EndDate: values.EndDate,
                questions: values.questions,
            })

            setIsSubmitting(false);

            if (response.status === 201) {
                setIsSubmitting(false);
                toast({
                    title: "QUIZ🧠 Submitted Successfully",
                    description: "Your QUIZ🧠 has been submitted successfully.",
                });
                form.reset();
            } else {

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
        <div className=" flex flex-col items-center justify-center  paddings">
            <h1 className="text-3xl flex flex-row items-center justify-center gap-2 font-extrabold bg-gradient-to-r from-gray-700 text-center mb-2 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                <IconBadge icon={LayoutDashboard} variant={"success"} />
                Publish Quiz
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
                                        Enter Your Quiz Title
                                    </FormDescription>
                                    <FormMessage>{form.formState.errors.Title?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

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
                                        Upload Thumbnail for your Quiz
                                    </FormDescription>
                                    <FormMessage>
                                        {form.formState.errors.Thumbnail?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="NumberOfDay"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number Of Day</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g 1" {...field} className="!ring-0 !ring-offset-0 " />
                                    </FormControl>
                                    <FormDescription>
                                        Enter Your Quiz DownloadLink
                                    </FormDescription>
                                    <FormMessage>{form.formState.errors.NumberOfDay?.message}</FormMessage>
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
                                        Enter Your Quiz Description
                                    </FormDescription>
                                    <FormMessage>{form.formState.errors.Description?.message}</FormMessage>
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="Level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Level</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <ScrollArea className="no-scrollbar h-44 w-auto">
                                                    <SelectGroup>
                                                        <SelectLabel>Levels</SelectLabel>
                                                        {LevelArray.map((level) => {
                                                            return (
                                                                <SelectItem
                                                                    key={level}
                                                                    {...field}
                                                                    value={level.toString()}
                                                                >
                                                                    {level}
                                                                </SelectItem>
                                                            )
                                                        })}
                                                    </SelectGroup>
                                                </ScrollArea>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.Level?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-start items-center flex-row gap-2">
                            <FormField
                                control={form.control}
                                name="StartDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}

                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Start Date of Quiz
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="EndDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>End Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}

                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            End Date Of Quiz
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/*  ADD QUESTION FORM HERE */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <IconBadge icon={ListChecks} variant={"level"} />
                                    <h2 className="text-xl font-semibold">Add Questions</h2>
                                </div>
                            </div>
                            <div className="relative mt-6 border bg-slate-100 dark:bg-zinc-700 rounded-md p-4">
                                <div className="font-medium flex items-center justify-between">
                                    Add Questions
                                    <Button onClick={toggleCreating} variant="ghost" type="button">
                                        {isCreating ? (
                                            <>Cancel</>
                                        ) : (
                                            <>
                                                <PlusCircle className="h-4 w-4 mr-2" />
                                                Add a Question
                                            </>
                                        )
                                        }
                                    </Button>
                                </div>
                                {isCreating && (
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                            {fields.map((question, index) => (
                                                <div key={question.id} className="   space-y-4 border rounded-md p-4 bg-slate-200 dark:bg-zinc-700">
                                                    <FormField
                                                        control={form.control}
                                                        name={`questions.${index}.questionTitle`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <div className="flex flex-row justify-center items-center space-x-2">
                                                                    <IconBadge variant={"level"} icon={Activity} size={"sm"} />
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder={`Question #${index + 1}`}
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </div>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {question.options.map((option, optionIndex) => (
                                                        <FormField
                                                            control={form.control}
                                                            name={`questions.${index}.options.${optionIndex}`}
                                                            key={optionIndex}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <div className="flex flex-row justify-center items-center space-x-2">
                                                                        <IconBadge variant={"warning"} icon={ListTodo} size={"sm"} />
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder={`Option ${optionIndex + 1}`}
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </div>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                    <FormField
                                                        control={form.control}
                                                        name={`questions.${index}.correctOption`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <div className="flex flex-row justify-center items-center space-x-2">
                                                                    <IconBadge variant={"success"} icon={CheckCircle} size={"sm"} />
                                                                    <FormControl >
                                                                        <Input
                                                                            placeholder="Correct Answer"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </div>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`questions.${index}.timer`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <div className="flex flex-row justify-center items-center space-x-2">
                                                                    <IconBadge variant={"timer"} icon={Timer} size={"sm"} />
                                                                    <FormControl >

                                                                        <Input
                                                                            placeholder="Timer"
                                                                            {...field}

                                                                        />

                                                                    </FormControl>
                                                                </div>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button type="button" variant={"ghost"} onClick={() => remove(index)}>
                                                        <>
                                                            <MinusCircle className="h-4 w-4 mr-2" />
                                                            Remove
                                                        </>
                                                    </Button>
                                                </div>
                                            ))}
                                            <div className="flex space-x-4 justify-end">
                                                {fields.length === 0 ? (
                                                    <Button type="button" onClick={addQuestion}>
                                                        Let's Add Your Question
                                                    </Button>
                                                ) : (
                                                    <Button type="button" onClick={addQuestion} disabled={fields.length >= 10}>
                                                        Add Another Question
                                                    </Button>
                                                )}
                                            </div>
                                        </form>
                                    </Form>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="mb-10">
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "Publish"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateQuiz;