import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const CEOCard = () => {
    return (
        <div className="w-full bg-white   flex md:flex-row flex-col border rounded-lg shadow dark:bg-[#0f172a] mt-16 mb-16">
            <div className="flex flex-col items-center justify-center md:w-80 w-full">
                <Image alt='' src="/assests/Memoji.svg" height={100} width={100} className="object-contain rounded-full" />
                <h1 className="text-xl font-bold  text-zinc-600 dark:text-zinc-100">Suraj Jha</h1>
            </div>
            <div>
                <div className="p-4 rounded-lg md:p-8 dark:bg-[#0f172a] ">
                    <h2 className="mb-3 md:text-3xl text-2xl  font-extrabold tracking-tight text-zinc-600 dark:text-zinc-100">Founder & CEO <span className="bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">CODERSYUG</span></h2>
                    <p className="mb-3 text-md text-zinc-600 dark:text-zinc-100">Supercharge your software development journey with Sigma-Node! Join a vibrant community of like-minded developers for unparalleled knowledge sharing, collaboration, and inspiration. Discover thought-provoking posts, insightful blogs, bite-sized shorts, and engaging podcasts that keep you on the forefront of tech news and trends. Elevate your skills and stay ahead of the curve. Join Sigma-Node today!</p>
                    <Link href="#" className="inline-flex items-center font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                        Join the Community
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