import React from 'react'

import { AiFillGithub, AiFillMail } from "react-icons/ai"

import { BiLogoReact } from "react-icons/bi"

import { SiAppwrite } from "react-icons/si"

import { Bot ,BookCopy, Workflow} from 'lucide-react'



const MoreFeature = () => {

    const FeatureItems = [
        {
            "id": 1,
            "title": "Superfast Next.js Powered Platform",
            "description": "Codersyug  are powered by Next.js, and are served via Vercel's word class CDN.",
            "icon": (<BiLogoReact  size={35} className='text-cyan-600' />)
        },
        {
            "id": 2,
            "title": "Quality Resources",
            "description": "CodersYug offers a comprehensive collection of high-quality learning resources for computer science students. Access tutorials, articles, and materials that are carefully curated to enhance your learning experience.",
            "icon": (<BookCopy size={35} className='text-yellow-500' />)
        },
        {
            "id": 3,
            "title": "Personalized AI's Learning Experience",
            "description": "Enjoy a personalized learning journey with CodersYug's AI-driven features. Receive tailored recommendations for courses, articles, and resources based on your interests and skill level, optimizing your learning experience.",
            "icon": (<Bot size={35} className='text-indigo-600' />)
        },
        {
            "id": 4,
            "title": "Free built-in newsletter service",
            "description": "Enable a newsletter service with the click of a button, and let your readers easily subscribe to your developer Page.",
            "icon": (<AiFillMail size={35} className='text-red-500' />)
        },
        {
            "id": 5,
            "title": "Built-in Professional Analytics",
            "description": "Gain valuable insights into your content and platform performance with CodersYug's integrated professional analytics tools. Monitor user engagement, track trends, and make data-driven decisions.",
            "icon": (<SiAppwrite size={35} className={"text-pink-500"} />)
        },
        {
            "id": 6,
            "title": "Content Series",
            "description": "Series is a great way to organize your content. It helps you easily group a series of Content related to a single topic.",
            "icon": (<Workflow  size={35} className='text-green-500' />)
        },
        {
            "id": 7,
            "title": "Open Source",
            "description": "codersYug embraces the open-source ethos. Join the community, contribute to open-source projects, and collaborate with fellow developers to foster innovation and knowledge sharing.",
            "icon": (<AiFillGithub size={35} className='text-black dark:text-white' />)
        },
    ]

    return (
        <section className=' glassmorphism flex w-[100%]  flex-col p-4 mt-12 rounded-lg max-w-full '>
            <h4 className='items-center justify-center uppercase flex text-center font-bold text-md  text-zinc-600 '>MAKE CODERS LIFE EASY!</h4>
            <h1 className='items-center justify-center flex text-center mt-9 font-extrabold md:text-4xl text-3xl  bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400'>Features that make "CODERSYUG" </h1>
            <h1 className='items-center justify-center flex text-center font-bold md:text-4xl text-3xl  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'>10x better</h1>


            <div className="grid md:grid-cols-2 gird-cols-1 gap-4 mt-12">
                {/* Card 1 */}
                {FeatureItems.map((item) => (
                    <div key={item.id} className="p-4 rounded-lg ">
                        <h3 className="text-xl font-bold flex flex-row justify-start text-zinc-600 dark:bg-gradient-to-r dark:from-indigo-300 dark:to-purple-400 items-center dark:bg-clip-text dark:text-transparent md:text-left gap-3">
                            {item.icon}
                            {item.title}
                        </h3>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{item.description}</p>
                    </div>
                ))
                }

            </div>


        </section>
    )
}

export default MoreFeature