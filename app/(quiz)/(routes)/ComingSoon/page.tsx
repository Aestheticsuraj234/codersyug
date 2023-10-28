import React from 'react'
import DigitalHackathonTimer from './_components/DigitalHackathonTimer'
import Link from 'next/link'
import { isUserVerified } from '@/server-action/hackathon'
import { redirect } from 'next/navigation'


const ComingSoonHackathon = async() => {

const isUserVerify = await isUserVerified()

if(!isUserVerify) {
  return redirect("/QuizEnter")
}

  return (
    <div className='flex flex-col h-screen justify-center gap-10  bg-[url("/ComingSoon2.svg")] bg-cover bg-center nav-padding paddings items-center   ' >
      <h1 className='text-4xl font-bold text-center text-zinc-900 dark:text-zinc-100'>Coming Soon🥇</h1>
      <DigitalHackathonTimer />
    
      <Link href="https://chat.whatsapp.com/FSRSe9N8jte5TqZ8aR0QeF" className="text-green-500 dark:text-green-400 font-extrabold text-center ">
        Join the WhatsApp Group so that we will notify you.!
      </Link>
    


    </div>
  )
}

export default ComingSoonHackathon