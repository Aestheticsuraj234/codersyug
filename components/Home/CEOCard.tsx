import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const CEOCard = () => {
    return (
        <div className="w-full bg-white   flex md:flex-row flex-col border rounded-lg shadow dark:bg-[#0f172a] mt-16 mb-16">
            <div className="flex flex-col items-center justify-center md:w-80 w-full">
                <Image alt='' src="https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6519c6914b79c432b366/view?project=64d3707fc8db92bf44ff&mode=admin" height={100} width={100} className="object-contain rounded-full" />
                <h1 className="text-xl font-bold  text-zinc-600 dark:text-zinc-100">Suraj Jha</h1>
            </div>
            <div>
                <div className="p-4 rounded-lg md:p-8 dark:bg-[#0f172a] ">
                    <h2 className="mb-3 md:text-3xl text-xl  font-extrabold tracking-tight text-zinc-600 dark:text-zinc-100">Founder & CEO <span className="bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">CODERSYUG</span></h2>
                    <p className="mb-3 text-md text-zinc-600 dark:text-zinc-100">CodersYug is an all-in-one platform designed to empower computer science students throughout their academic journey and beyond. It offers a wide range of services and resources to enhance their learning experience and career prospects.</p>
                    <Link href="/blogs" className="inline-flex items-center font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                        Join Now
                        <ChevronRight
                            size={20}
                            className="ml-2"
                            color='#fff'
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CEOCard;