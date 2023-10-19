"use client"
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import { ThemeToggle } from './theme-toggle'
import { SearchBar } from './search-bar'
import { Code2 , Github} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MobileToggle } from './mobile-toggle'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    return (
        <div className='md:border-b md:fixed top-0 
        md:z-50 w-full  shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur
'>
            <div className='md:flex hidden h-16 items-center px-4'>
                <Link href={"/"} className='flex flex-row items-center space-x-2 cursor-pointer'>
                    <Code2 className='text-zinc-800 dark:text-zinc-100 cursor-pointer' />
                    <h1 className='text-xl font-bold text-zinc-800 dark:text-zinc-100 cursor-pointer'>CODERSYUG</h1>
                    <Badge variant="default">Beta</Badge>
                </Link>
                <MainNav className='mx-6' />
                <div className='ml-auto flex items-center space-x-4'>
                    

                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                    <Link href={"https://github.com/Aestheticsuraj234/codersyug"}>
                    <Button variant={"outline"}   size="default" >
                    <Github
                    size={25}
                    className='text-zinc-800 dark:text-zinc-100'
                    />
                    </Button>
                    </Link>
                </div>
            </div>
            <MobileToggle />
        </div>
    )
}

export default Navbar