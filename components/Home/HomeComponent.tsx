
import React from "react"
import Link from "next/link"
import {  MoveRight } from "lucide-react"
import Image from "next/image"
import HackathonCard from "./HackathonCard"



const HomeComponent = async () => {




    return (
        <section className="nav-padding paddings ">
           <HackathonCard />

            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-3xl bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent mb-2 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl "> All-in-one platform designed to empower computer science students.</h1>
                    <p className="max-w-2xl mb-6 font-semibold text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 ">CodersYug is an all-in-one platform designed to empower computer science students throughout their academic journey and beyond. It offers a wide range of services and resources to enhance their learning experience and career prospects.</p>
                    <Link href="/blogs" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Get started for Free ✨
                        <MoveRight />
                    </Link>
                </div>
                <div className="hidden  lg:mt-0 lg:col-span-5 lg:flex">
                    <Image src="/assests/cod.svg" alt="hero" width={450} height={450} />
                </div>
            </div>
        </section>
    )
}

export default HomeComponent