"use client"
import Link from "next/link";

import Image from "next/image";
import { QuizCodeForm } from "./quiz-input";

// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Check, CopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import UniqueCodeComponent from "./uniquecode";


const QuizLobbyEnter = () => {
    const { user } = useUser();
   
    useEffect(() => {
        // Create the Typewriter effect for "Hello" and the user's name
        const typewriterOptions = {
            strings: [`Hello! ,  ${user?.fullName}`],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 50,
            pauseFor: 1000,
            cursor: '',
            wrapperClassName: 'text-zinc-700 dark:text-zinc-300 text-2xl font-semibold',

        };

        // Initialize the Typewriter effect after the component has mounted (client-side)
        new Typewriter('#typewriter', typewriterOptions);
    }, [user]);

   

  

    return (
        <>
            <section className="nav-padding paddings ">
         <UniqueCodeComponent/>
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <div id="typewriter" className="font-semibold text-zinc-700 dark:text-zinc-300 text-2xl">

                        </div>
                        <h1 className="max-w-3xl text-gray-700 dark:text-gray-200 mb-2 text-xl font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl ">
                            <br />Enter Your code and let's start our quiz.
                        </h1>
                        <p className="max-w-2xl mb-6 font-semibold text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 ">
                            Enter your code and start your quiz. If you don't have a code, then click <Link href={"/hackathons"} className="underline font-bold text-green-500">Here</Link>
                        </p>
                        <div className="w-full">
                            <QuizCodeForm />
                        </div>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image src="/quizlobby.svg" alt="hero" width={450} height={450} />
                    </div>
                </div>
            </section>
            <hr className="w-1/2 mx-auto my-8 border-gray-200 dark:border-gray-800" />
            <p className="paddings">
                <span className="font-semibold text-gray-600 dark:text-gray-300">Note: </span>
                <span className="text-gray-600 dark:text-gray-300">
                    If you have not Received your Code , Please check your Spam Folder in Gmail or Contact us at <a href="mailto:codersyug@gmail.com">
                        Here
                    </a>
                </span>
            </p>
        </>
    );
};

export default QuizLobbyEnter;
