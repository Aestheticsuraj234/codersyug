"use client";
import React, { useEffect, useState, MutableRefObject } from 'react';

import EditorJS from '@editorjs/editorjs';
import { uploadFiles } from '@/lib/uploadthing';



const Editor = ({ editorRef }: { editorRef: MutableRefObject<EditorJS> }) => {
    const [isMounted, setIsMounted] = useState(false);

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
            return () => {
                editorRef.current?.destroy();
            }
        }
    }, [isMounted]);



    return (
        <div className='nav-padding paddings mt-20 bg-'>
            <div id="editorjs" className="prose max-w-full border rounded-sm py-10 px-10" />
        </div>
    )
}

export default Editor;
