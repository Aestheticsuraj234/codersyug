"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import Image from "next/image";
import { AtSign, Backpack, BrainCircuit, Code2, Home, ScrollText, ShieldCheck } from "lucide-react";

export function MobileNavigation({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
   

    const routes = [
        {
            href: `/`,
            label: 'Home',
            icon: <Home  />,
            active: pathname === `/`,
        },

        {
            href: `/blogs`,
            label: 'Blogs',
            icon: <ScrollText />,
            active: pathname === `/blogs`,
        },
        {
            href: `/Resources`,
            label: 'Resources',
            icon: <Backpack  />,
            active: pathname === `/Resources`,
        },
        {
            href: `/MockTests`,
            label: 'Mock-Tests',
            icon: <ShieldCheck />,

            active: pathname === `/MockTests`,
        },
        {
            href: `/MentorshipPrograms`,
            label: 'Mentorship',
            icon: <AtSign  />,
            active: pathname === `/MentorshipPrograms`,
        },
        {
            href: `/CodersYugAI`,
            label: ' CodersYug\'s AI',
            icon: <BrainCircuit  />,
            active: pathname === `/CodersYugAI`,
        },

    ]

    return (
        <>

            <nav
                className={cn("md:hidden flex flex-col flex-1  fixed top-0  items-start justify-start mx-6 my-4 ", className)}
                {...props}
            >
                <div className='flex flex-row items-center space-x-2 '>
                    <Code2 className='text-zinc-800 dark:text-zinc-100' />
                    <h1 className='text-xl font-bold text-zinc-800 dark:text-zinc-100 ' >  CODERSYUG</h1>
                </div>
                <div className="flex flex-1 flex-col space-y-10 mt-10 w-full ">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                'text-lg flex items-center  justify-start gap-5 font-bold transition-colors hover:text-primary',
                                route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
                            )}
                        >
                            {route.icon}
                            {route.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    )
};