"use client";
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import EditorJS from '@editorjs/editorjs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { uploadFiles } from '@/lib/uploadthing';

const FormSchema = z.object({
  content: z.any().optional(),

})



const page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const editorRef = React.useRef<EditorJS | null>(null);


  const initializeEditor = async () => {
      // @ts-ignore
      const EditorJS = (await import('@editorjs/editorjs')).default;
         // @ts-ignore
      const Header = (await import('@editorjs/header')).default;
         // @ts-ignore
      const List = (await import('@editorjs/list')).default;
         // @ts-ignore
      const Embed = (await import('@editorjs/embed')).default;
         // @ts-ignore
      const Table = (await import('@editorjs/table')).default;
         // @ts-ignore
      const Image = (await import('@editorjs/image')).default;
         // @ts-ignore
      const Quote = (await import('@editorjs/quote')).default;
         // @ts-ignore
      const Marker = (await import('@editorjs/marker')).default;
         // @ts-ignore
      const Warning = (await import('@editorjs/warning')).default;
         // @ts-ignore
      const LinkTool = (await import('@editorjs/link')).default;
         // @ts-ignore
      const RawTool = (await import('@editorjs/raw')).default;
         // @ts-ignore
      const Delimiter = (await import('@editorjs/delimiter')).default;
         // @ts-ignore
      const InlineCode = (await import('@editorjs/inline-code')).default;
 // @ts-ignore
      const SimpleImage = (await import('@editorjs/simple-image')).default;
         // @ts-ignore
      const Checklist = (await import('@editorjs/checklist')).default;
         // @ts-ignore
      const WarningTool = (await import('@editorjs/warning')).default;
         // @ts-ignore
      const CodeBox = (await import('@bomdi/codebox')).default;

      if (!editorRef.current) {
          const editor = new EditorJS({
              holder: 'editorjs',
              onReady: () => {
                  if (editorRef.current) {
                      editorRef.current = editor;
                  }
              },
           
              placeholder: 'Type here to write your content...',
              inlineToolbar: true,
              data: { blocks: [] },

              tools: {
                  header: Header,
                  list: List,
                  embed: Embed,
                  table: Table,
                  image: {
                      class: Image,
                      config: {
                          uploader: {
                              async uploadByFile(file: File) {
                                  // Upload to the 'uploadthing'
                                  const [res] = await uploadFiles({
                                      endpoint: 'media',
                                      files: [file],
                                  });

                                  return {
                                      success: 1,
                                      file: {
                                          url: res.url,
                                      },
                                  };
                              },
                          },
                      },
                  },
                  quote: Quote,
                  marker: Marker,
                  warning: Warning,
                  code: {
                      class: CodeBox,
                      config: {
                          themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css',
                          themeName: 'atom-one-dark',
                      },
                  },
                  linkTool: {
                      class: LinkTool,
                      config: {
                          endpoint: '/api/blog/link',
                      },
                  },
                  raw: RawTool,
                  delimiter: Delimiter,
                  inlineCode: InlineCode,
                  simpleImage: SimpleImage,
                  checklist: Checklist,
                  warningTool: WarningTool,
              },
          });

          editorRef.current = editor;
         
      }
  };

  useEffect(() => {
      if (typeof window !== 'undefined') {
          setIsMounted(true);
      }
  }, []);

  useEffect(() => {
      const init = async () => {
          await initializeEditor();
      };

      if (isMounted) {
          init();
          return ()=>{
            editorRef.current?.destroy();
          }
      }
  }, [isMounted]);



  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: null,
    }
  })


  async function onSubmit() {
    if(editorRef.current){
      editorRef.current.save().then((outputData)=>{
      
      
        form.setValue('content', outputData);
      
      })
    }
    
  }
  

  
  return (
    <div className='nav-padding paddings  mt-20 bg-'>
      {/* <Editor /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full  space-y-6 mb-10">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Write Your Content</FormLabel>
                <FormControl>
                <div id="editorjs" className="prose max-w-full border rounded-sm py-10 px-10"  />
                </FormControl>
                <FormDescription>
                  Enter the content for your article (at least 10 characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <button  type='submit' >
                  Save
              </button>

        </form>
      </Form>
              
             
    </div>
  )
}

export default page