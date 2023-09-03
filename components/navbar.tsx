import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import { ThemeToggle } from './theme-toggle'
import { SearchBar } from './search-bar'

const Navbar = () => {
    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <div>
                    <h1 className='text-2xl font-bold'>CODERSYUG</h1>
                </div>
                <MainNav className='mx-6' />
                <div className='ml-auto flex items-center space-x-4'>
                    <SearchBar />

                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default Navbar