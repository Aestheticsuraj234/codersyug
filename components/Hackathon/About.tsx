import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const About = () => {
    return (
        <section id="about" className="mt-10 py-8 flex-center flex-col">
            <h1 className="text-2xl font-bold text-center  md:text-4xl text-gray-800 dark:text-white">About Codersyug🚀</h1>
            <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7 mt-10">
                    <h1 className="max-w-3xl bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-yellow-300 dark:to-green-600 bg-clip-text text-transparent mb-2 text-xl font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl">
                        All-in-one platform designed to empower computer science students.
                    </h1>
                    <p className="max-w-2xl mb-6 font-semibold text-gray-500 lg:mb-8 md:text-base lg:text-xl dark:text-gray-400">
                        CodersYug is an all-in-one platform designed to empower computer science students throughout their academic journey and beyond. It offers a wide range of services and resources to enhance their learning experience and career prospects.
                    </p>
                    <Image src="/arrow_trail.svg" alt="hero" width={450} height={450} />
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image src="/Hero_1.svg" alt="hero" width={350} height={350} />
                </div>
            </div>
            <div className="flex items-center justify-center frame w-full max-w-5xl flex-col paddings py-16 sm:px-8">
                <div className="sm-box sm-box-1 dark:bg-gray-800  bg-zinc-100 "></div>
                <div className="sm-box sm-box-2 dark:bg-gray-800  bg-zinc-100"></div>
                <div className="sm-box sm-box-3 dark:bg-gray-800  bg-zinc-100"></div>
                <div className="sm-box sm-box-4 dark:bg-gray-800  bg-zinc-100"></div>
                <div className="sm-box sm-box-5 dark:bg-gray-800  bg-zinc-100"></div>
                <div className="sm-box sm-box-6 dark:bg-gray-800  bg-zinc-100"></div>
                <div className="sm-box sm-box-7 dark:bg-gray-800  bg-zinc-100"></div>
                <div className="sm-box sm-box-8 dark:bg-gray-800  bg-zinc-100"></div>
                <div className="flex flex-col gap-12 p-10 max-sm:px-6 max-sm:py-0 text-center">
                    <Link href={"https://github.com/Aestheticsuraj234/codersyug"} target="_blank" className="sm:heading2 heading3 max-w-xl dark:text-white text-gray-800 cursor-pointer">
                        Give us Star on Github🌟
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default About;
