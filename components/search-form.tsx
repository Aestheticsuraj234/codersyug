"use client";
import React, { use, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';

const SearchForm = () => {
    const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (search) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: search,
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

   
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
                    placeholder="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </label>
        </form>
    )
}

export default SearchForm