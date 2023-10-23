"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '@/lib/framer-motion';
import Timeline from '@/components/Hackathon/Timeline';
import Prize from '@/components/Hackathon/Prize';
import Participation from '@/components/Hackathon/Participation';
import About from '@/components/Hackathon/About';
import FrequentlyAskedQuestion from '@/components/Hackathon/Faq';
import { HandleRegistration, isUserAlreadyRegistered } from '@/server-action/hackathon';
import { useToast } from '@/components/ui/use-toast';
import { Code2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Rules from '@/components/Hackathon/Rules';
import StickyButton from '@/components/Hackathon/sticky-button';
const HackathonPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    useEffect(() => {
        // Check if the user is already registered when the component mounts
        checkUserRegistration();
    }, []);

    const checkUserRegistration = async () => {
        try {
            const response = await isUserAlreadyRegistered();
            setIsUserRegistered(response);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const onRegister = async () => {
        try {
            setIsRegistering(true);
            const response = await HandleRegistration();

            if (response === "You have already participated in the quiz.") {
                toast({
                    title: 'Already Registered🤷‍♂️',
                    description: 'You have already participated in the quiz',
                });
            } else if (response) {
                setIsUserRegistered(true); // User is now registered
                toast({
                    title: 'success👑',
                    description: 'Registration successful. Check your email for details and your quiz code.',
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Not Logged In🤷‍♂️',
                    description: 'Registration failed. Please try again later.',
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'error',
                description: 'An error occurred while registering. Please try again later🧠.',
            });
        } finally {
            setIsRegistering(false);
        }
    };


    return (
        <>
            <div className="flex justify-center items-center dark:bg-black bg-white w-full flex-col gap-5 mt-10 h-screen bg-cover bg-center bg-[url('/Background-Hackathon.png')] ">
                <motion.h1
                    variants={textVariant(0.5)}
                    className="max-w-3xl text-center flex md:flex-row flex-col justify-center items-center gap-2 bg-gradient-to-r from-yellow-300 to-green-600  bg-clip-text text-transparent mb-2 text-2xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl">
                    <Image src="/code-2.svg" alt="hero" width={100} height={100} />

                    Codersyug Hackathon
                </motion.h1>
                <motion.p className="max-w-2xl mb-6 text-center font-semibold text-gray-800 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    Codersyug Hackathon is a 10 days virtual hackathon that brings together
                    the best students from all over the country to compete for
                    prizes by attempting to solve quizzes and coding challenges in a range
                </motion.p>
                {
                    isUserRegistered ? (
                        <>
                            <Button
                                onClick={() => router.push("/QuizEnter")}
                                className={`rounded-full flex dark:bg-white dark:text-black bg-black text-white border-transparent focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-zinc-100 disabled:bg-zinc-300 disabled:cursor-not-allowed disabled:dark:text-slate-400 text-base py-3 px-6`}
                            >
                                Get Started🚀
                            </Button>
                            <p className='  text-center text-gray-800 dark:text-gray-400 font-semibold text-lg mt-5'>
                                Click on Get Started to start the quiz🧠
                            </p>
                        </>
                    ) : (
                        <Button
                            onClick={onRegister}
                            className={`rounded-full flex dark:bg-white dark:text-black bg-black text-white border-transparent  text-base py-3 px-6 ${isRegistering ? 'hidden' : ''}`}
                        >
                            {isRegistering ? <Loader2 className="animate-spin dark:text-black text-white" size={30} /> : 'Register Now'}
                        </Button>
                    )
                }



                <p className="max-w-md py-2.5 px-5 mb-6 text-center mt-10 border-dashed border-gray-800 dark:border-yellow-400 border-2 rounded-md font-medium text-gray-800 lg:mb-8 md:text-base lg:text-sm dark:text-gray-400">
                    By registering to this hackathon you are giving permission to Codersyug to send you details over email.
                </p>
            </div>
            <StickyButton />
            <Timeline />
            <Prize />
            <Rules />
            <About />
            <Participation />
            <FrequentlyAskedQuestion />
        </>
    );
};

export default HackathonPage;
