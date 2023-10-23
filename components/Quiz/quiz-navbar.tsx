"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'
import { MainNav } from '../Global/main-nav'
import { ThemeToggle } from '../Global/theme-toggle'
import { SearchBar } from '../Global/search-bar'
import { Code2, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MobileToggle } from '../Global/mobile-toggle'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { date } from 'zod'
import QuizNavbarClock from './quiz-navbar-clock'
import { QuizMobileNavbar } from './quiz-mobile-navigation'

const QuizNavbar = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        setIsMounted(true);
        let hours = new Date().getHours();
        if (hours < 12) {
            setGreeting("Good Morning 🌅");
        } else if (hours < 17) {
            setGreeting("Good Afternoon 🚀");
        } else if (hours < 20) {
            setGreeting("Good Evening 🌃");
        } else {
            setGreeting("Good Night 🌙");
        }
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='md:fixed top-0 md:z-50 w-full shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur'>
            <div className='md:flex hidden h-16 items-center px-4'>
                <Link href={"/"} className='flex flex-row items-center space-x-2 cursor-pointer'>
                    <h1 className='text-xl flex-1 font-bold text-zinc-600 dark:text-zinc-100 cursor-pointer'>
                        {greeting}
                    </h1>
                </Link>

                <div className='ml-auto flex items-center space-x-4'>
                    <QuizNavbarClock />
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
            <QuizMobileNavbar />
        </div>
    )
}

export default QuizNavbar;
