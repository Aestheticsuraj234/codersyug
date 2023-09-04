import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import { ThemeToggle } from './theme-toggle'
import { SearchBar } from './search-bar'
import { Code2 , Github} from 'lucide-react'
import { Button } from './ui/button'
import { MobileToggle } from './mobile-toggle'

const Navbar = () => {
    return (
        <div className='md:border-b md:fixed top-0 
        md:z-50 w-full  shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur
'>
            <div className='md:flex hidden h-16 items-center px-4'>
                <div className='flex flex-row items-center space-x-2'>
                    <Code2 className='text-zinc-800 dark:text-zinc-100' />
                    <h1 className='text-xl font-bold text-zinc-800 dark:text-zinc-100 ' >  CODERSYUG</h1>
                </div>
                <MainNav className='mx-6' />
                <div className='ml-auto flex items-center space-x-4'>
                    <SearchBar />

                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                    <Button variant={"outline"}   size="default" >
                    <Github
                    size={25}
                    className='text-zinc-800 dark:text-zinc-100'

                    />
                    </Button>
                    
                </div>
            </div>
            <MobileToggle />
        </div>
    )
}

export default Navbar