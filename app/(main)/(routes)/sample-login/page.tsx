import React from 'react'
import {
    BrainCircuit,
Code2, FileCode, Laptop,

} from "lucide-react"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignIn } from '@clerk/nextjs'
const SampleLogin = () => {
  return (
    <>
    <section className='flex-center paddings mx-auto w-full max-w-screen-2xl flex-col h-screen space-y-5'>
        <h1 className='heading1 flex flex-row flex-wrap  justify-center items-center gap-4 '> We Provide <span className='flex gap-2'> <Code2 size={64} className='text-emerald-400' /> Coding Articles</span>
        <span className='flex gap-2'> <FileCode size={64} className='text-yellow-400' />  Resources</span> 
      <span className='flex gap-2'><Laptop size={64} className='text-cyan-500'/>  Mentorship</span>
      <span className='flex gap-2'> <BrainCircuit size={64} className='text-indigo-400' />   Personalised AI </span> Together🚀.</h1>
    <desc className='base-bold text-zinc-500 
 '>
    All-in-one platform designed to empower computer science students.
    </desc>
    
  
    <div className='flex-center  mx-auto max-w-screen-2xl'>
    <Image
    src={"/assests/login-hero.svg"}
    alt="Login Hero"
   width={600}
    height={600}
    />
    </div>
  
    </section>

    </>
  )
}

export default SampleLogin