"use client"
import { incrementViewOnDownload } from '@/server-action/action';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Code, MoveRight } from "lucide-react"

import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';
import Loading from '../../../blogs/(blogRoutes)/loading';


const ResoucesDownloadPage = () => {
    const { toast } = useToast()
    const [resources, setResources] = useState<any>();
    const [isFetching, setIsFetching] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        getResourcesContent();
    }, [slug]);

    const getResourcesContent = async () => {
        try {
            setIsFetching(true);
            const res = await axios.get(`/api/resources/${slug}`);
            setResources(res.data);
            toast({
                title: "Successfully: Catch up",
                description: "Successfully catch up with the server",
            })
            setIsFetching(false);



        } catch (error) {
            toast({
                title: "Error: Catch up",
                description: "Error catch up with the server",
            })
            setIsFetching(false);

        }


    }

    const handleDownload = async () => {
        await incrementViewOnDownload(slug)
    }

    if(isFetching) return <div>
        <Loading />
    </div>

    return (
        <section className="nav-padding hero-height   flex w-[100%] flex-col items-center justify-center gap-5 lg:flex-row px-12">
            <div className='flex flex-1 flex-col items-start justify-center'>
                <p className="text-gradient_blue body-regular mb-2.5 text-center uppercase">CODERSYGUG - FOR THE DEVELOPERS BY THE DEVELOPER</p>
                <h1 className="sm:heading2 heading3">{resources?.Title}</h1>
                <div className='text-white-800 mt-6 text-[20px]'>
                    <p className="max-w-2xl mb-6 font-semibold text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 ">{resources?.Description}</p>
                    <div>
                        <Link
                            href={`${resources?.DownloadLink}`}
                            onClick={handleDownload}
                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Download Now
                            <MoveRight />
                        </Link>
                    </div>
                </div>
            </div>





            <div className="flex flex-1 justify-center lg:mb-12 lg:justify-end lg:pr-12">
                <Image src={resources?.Thumbnail} alt="ebook image" loading="lazy" width="270" height="370" decoding="async" data-nimg="1" className="rounded-lg object-contain lg:rotate-12" />
            </div>

        </section>
    );
};

export default ResoucesDownloadPage;