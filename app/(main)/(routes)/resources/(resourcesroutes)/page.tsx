"use client"
import Filters from '@/components/filters'
import SearchForm from '@/components/search-form'
import React, { useEffect, useState } from 'react'
import StickyButton from '@/components/sticky-button';

const Page = () => {

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <main className='flex-center paddings mx-auto w-full max-w-screen-2xl flex-col '>
        <section className='nav-padding w-full'>
          <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-[url('/jsm_resources_banner.svg')] bg-cover bg-center text-center">
            <h1 className='sm:heading1 heading2 mb-6 text-center text-white '>CodersYug Resources</h1>
          </div>
          <SearchForm />

        </section>
        <Filters />
        <StickyButton />


      </main>
    </>
  )
}

export default Page

