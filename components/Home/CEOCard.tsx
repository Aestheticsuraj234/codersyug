import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Github, Instagram, Linkedin, TwitchIcon, Twitter } from 'lucide-react';

const CEOCard = () => {

    const FoundersDetails = [
        {
            id:1,
            name:'Suraj Jha',
            designation:'Founder & CEO',
            image:'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/652ef07c61fb9e4b9963/view?project=64d3707fc8db92bf44ff&mode=admin',
            description:'CodersYug is an all-in-one platform designed to empower computer science students throughout their academic journey and beyond. It offers a wide range of services and resources to enhance their learning experience and career prospects.',
            instagram:'https://www.instagram.com/sigma_developer_/',
            linkedin:'https://www.linkedin.com/in/suraj-jha-875744250/',
            github:'https://github.com/Aestheticsuraj234'

        },
        {
            id:2,
            name:'Code With Random',
            designation:'Co-Founder & CTO',
            image:'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6526f6e6546a7cd7e1b3/view?project=64d3707fc8db92bf44ff&mode=admin',
            description:'CodersYug offers a comprehensive collection of high-quality learning resources for computer science students. Access tutorials, articles, and materials that are carefully curated to enhance your learning experience  grow your knowledge.',
            instagram:'https://www.instagram.com/codewith_random/',
            linkedin:'https://www.linkedin.com/company/codewithrandom/',
            twitter:'https://twitter.com/',
        }
    ]

    return (
        
        <div className='flex-center md:gap-4  flex-col md:flex-row'>
{
    FoundersDetails.map((founder) => (
        <div key={founder.id} className="w-full bg-white   flex  flex-col border rounded-lg shadow dark:bg-[#0f172a] mt-16 mb-16">
        <div className="flex flex-col items-center justify-center mt-2">
            <Image alt='' src={founder.image} height={100} width={100} className="object-contain rounded-full" />
            <h1 className="text-xl font-bold  text-zinc-600 dark:text-zinc-100">{founder.name}</h1>
            <div className='flex flex-center gap-4 flex-row mt-3 '>
                <Link href={founder.instagram}>
                    <Instagram size={20} className='cursor-pointer hover:text-pink-500' />
                </Link>
                <Link href={founder.linkedin}>
                    <Linkedin size={20} className='cursor-pointer hover:text-blue-500' />
                </Link>
                <Link href={founder.twitter}>
                    <Twitter size={20} className='cursor-pointer hover:text-blue-400' />
                </Link>
            </div>
        </div>  
        <div>
            <div className="p-4 rounded-lg md:p-8 dark:bg-[#0f172a] text-center ">
                <h2 className="mb-3 md:text-3xl text-xl  font-extrabold tracking-tight text-zinc-600 dark:text-zinc-100 ">{founder.designation}<span className="bg-gradient-to-r ml-2 from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">CODERSYUG</span></h2>
                <p className="mb-3 text-md text-zinc-600 dark:text-zinc-100">{founder.description}</p>
                <Link href="/blogs" className="inline-flex items-center font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                    Join Now
                    <ChevronRight
                        size={20}
                        className="ml-2 dark:text-white text-black"
                        
                    />
                </Link>
            </div>
        </div>
    </div>
    ))
}
       




       
        </div> 
    );

}

export default CEOCard;