"use client";
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchForm = () => {
    const [search, setSearch] = useState('')
    return (
        <form className='flex-center mx-auto mt-10 w-full sm:-mt-10 sm:px-5'>
            <label className="flex-center relative w-full max-w-3xl">
                <Search
                    className="absolute left-8"
                    size={32}
                />
                <Input
                    className="base-regular  border h-fit  dark:bg-zinc-800 bg-zinc-50  py-4 pl-20 pr-8 dark:text-white text-zinc-800 !ring-0 !ring-offset-0 placeholder:text-zinc-800 dark:placeholder-zinc-100"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </label>
        </form>
    )
}

export default SearchForm