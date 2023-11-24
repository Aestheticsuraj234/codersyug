"use client";
import Editor from "@/components/editor";
import { getAllUsers, getUserCount } from "@/server-action/user";
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
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
import { z } from "zod";

const FormSchema = z.object({
  content: z.any().optional(),
});

const SendMail = () => {
  const editorRef = useRef<EditorJS | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: null,
    },
  });

  async function onSubmit(values: any) {
    if (editorRef.current) {
        const content = await editorRef.current.save();
        values.content = content; // Set the content field with the JSON content
    }
  }

  return (
    <div className="h-auto w-full nav-padding paddings">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Send Mail</h1>
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full  space-y-6 mb-10">
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
        <Button type="submit" className="w-full mb-4 font-bold">
            Send Mail
        </Button>
        </form>
        </Form>

      </div>
    </div>
  );
};

export default SendMail;
