
import React from 'react'
import DigitalHackathonTimer from './_components/DigitalHackathonTimer'
import Link from 'next/link'
import { isUserVerified } from '@/server-action/hackathon'
import { redirect } from 'next/navigation'
import DashboardButton from './_components/DashboardButton'
import WhatsAppButton from './_components/WhatsAppButton'



const ComingSoonHackathon = async() => {

const isUserVerify = await isUserVerified()

if(!isUserVerify) {
  return redirect("/QuizEnter")
}

  return (
    <div className='flex flex-col  justify-center gap-10  bg-[url("/ComingSoon2.svg")] bg-cover bg-center nav-padding paddings items-center   ' >
      <h1 className='text-4xl font-bold text-center text-zinc-900 dark:text-zinc-100'>Quiz Wuiz Hackathon Live Soon🥇</h1>
      <DigitalHackathonTimer />
    
      <Link href="https://chat.whatsapp.com/FSRSe9N8jte5TqZ8aR0QeF" target='_blank' className="text-zinc-700 px-2 py-2 rounded-md border-dashed border-emerald-400 border-2 dark:text-zinc-400 font-semibold text-center ">
      if you join WhatsApp group you get daily update and winner announcements details in group
      </Link>
      <div className='flex justify-center items-center gap-4'>
        <WhatsAppButton />
      <DashboardButton />
      </div>
    
    

    </div>
  )
}

export default ComingSoonHackathon
