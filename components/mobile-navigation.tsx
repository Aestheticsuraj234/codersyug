"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import Image from "next/image";
import { AtSign, Backpack, BrainCircuit, Code2, Home, ScrollText, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge"


export function MobileNavigation({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();


    const routes = [
        {
            href: `/`,
            label: 'Home',
            icon: <Home />,
            active: pathname === `/`,
            isInDevelopment: false,
        },

        {
            href: `/blogs`,
            label: 'Blogs',
            icon: <ScrollText />,
            active: pathname === `/blogs`,
            isInDevelopment: false,
        },
        {
            href: `/resources`,
            label: 'resources',
            icon: <Backpack />,
            active: pathname === `/resources`,
            isInDevelopment: false,
        },
        {
            href: `/#`,
            label: 'Mock-Tests',
            icon: <ShieldCheck />,

            active: pathname === `/mock-tests`,
            isInDevelopment: true,
        },
        {
            href: `/#`,
            label: 'Mentorship',
            icon: <AtSign />,
            active: pathname === `/mentorship-programs`,
            isInDevelopment: true,
        },
        {
            href: `/#`,
            label: ' CodersYug\'s AI',
            icon: <BrainCircuit />,
            active: pathname === `/codersYugAI`,
            isInDevelopment: true,
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
                                'text-base flex items-center  justify-start gap-5 font-semibold transition-colors hover:text-primary',
                                route.active ? 'text-black dark:text-white text-bold' : 'text-muted-foreground'
                            )}
                        >
                            {route.icon}
                            {route.label}
                            {
                                route.isInDevelopment && (
                                    <Badge variant="default">Soon!</Badge>

                                )
                            }
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    )
};