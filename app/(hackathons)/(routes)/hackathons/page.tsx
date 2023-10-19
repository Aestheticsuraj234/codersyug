"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion"
import {  fadeIn, textVariant} from '@/lib/framer-motion';
import Timeline from '@/components/Hackathon/Timeline';
import Prize from '@/components/Hackathon/Prize';
import Participation from '@/components/Hackathon/Participation';
import About from '@/components/Hackathon/About';
import FrequentlyAskedQuestion from '@/components/Hackathon/Faq';
import { useRouter } from 'next/navigation';
const HackathonPage = () => {
    

 // TODO: Add register logic 
        // 1. Check if user is Logged in 
        // ! If not logged in then redirect to login page
        // 2. If logged in then register the user
        // ! If user is already registered then show a toast message
        // ! If user is not registered then register the user and show a toast message
        // 3. Send mail to the user of confirmation of registration and generate quiz code

    const onRegister = async () => {
     
       
    };

    return (
        <>
        <div
            className='flex-center flex-col gap-5 mt-10 h-screen'
          
        >

            <motion.h1   variants={textVariant(0.5)} className="max-w-3xl text-center flex md:flex-row flex-col justify-center items-center gap-2 bg-gradient-to-r from-yellow-300 to-green-600 bg-clip-text text-transparent mb-2 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl">
                <Image src="/code-2.svg" alt="hero" width={100} height={100} />
                Codersyug Hackathon
            </motion.h1>
            <motion.p className="max-w-2xl mb-6 text-center font-semibold text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 ">
                Codersyug Hackathon is a 10 days virtual hackathon that brings together
                the best students from all over the country to compete for
                prizes by attempting to solve quizzes and coding challenges in a range
            </motion.p>
            <Button onClick={onRegister} className="rounded-full flex bg-white  text-black border-transparent  focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-zinc-100  disabled:bg-zinc-300 disabled:cursor-not-allowed  disabled:dark:text-slate-400 text-base py-3 px-6">
                Register Now
            </Button>
            <p className="max-w-md py-2.5 px-5 mb-6 text-center mt-10 border-dashed border-yellow-400 border-2 rounded-md  font-medium text-gray-500 lg:mb-8 md:text-base lg:text-sm dark:text-gray-400 ">
                By registering to this hackathon you are giving permission to Codersyug to send you  details over email.
            </p>
        </div>
            <Timeline/>
            <Prize/>
            <About/>
            <Participation/>
            <FrequentlyAskedQuestion />
        </>
    );
};

export default HackathonPage;
