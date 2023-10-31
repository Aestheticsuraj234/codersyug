
import React from 'react'
import {
  BrainCircuit,
  Code2, FileCode, Laptop,

} from "lucide-react"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignUp } from '@clerk/nextjs'
export default function Page() {
  return (
    <section className='flex-center paddings h-full mb-10 mx-auto relative z-0 flex-col space-y-7'>
      {/* <div className="flex-center mx-10 absolute top-0 z-[-1] h-full w-[90%] overflow-hidden"><svg viewBox="0 0 1194 1192" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.2"><circle cx="596" cy="596" r="594.5" stroke="url(#paint0_linear_1147_785)" stroke-width="3"></circle><circle cx="64" cy="335" r="10" fill="url(#paint1_linear_1147_785)"></circle><circle cx="187" cy="1029" r="10" fill="url(#paint2_linear_1147_785)"></circle><circle cx="1184" cy="684" r="10" fill="url(#paint3_linear_1147_785)"></circle></g><defs><linearGradient id="paint0_linear_1147_785" x1="27.8649" y1="603.544" x2="1201.29" y2="603.544" gradientUnits="userSpaceOnUse"><stop stop-color="#4CA5FF"></stop><stop offset="1" stop-color="#B673F8"></stop></linearGradient><linearGradient id="paint1_linear_1147_785" x1="54.4675" y1="335.127" x2="74.1558" y2="335.127" gradientUnits="userSpaceOnUse"><stop stop-color="#4CA5FF"></stop><stop offset="1" stop-color="#B673F8"></stop></linearGradient><linearGradient id="paint2_linear_1147_785" x1="177.468" y1="1029.13" x2="197.156" y2="1029.13" gradientUnits="userSpaceOnUse"><stop stop-color="#4CA5FF"></stop><stop offset="1" stop-color="#B673F8"></stop></linearGradient><linearGradient id="paint3_linear_1147_785" x1="1174.47" y1="684.127" x2="1194.16" y2="684.127" gradientUnits="userSpaceOnUse"><stop stop-color="#4CA5FF"></stop><stop offset="1" stop-color="#B673F8"></stop></linearGradient></defs></svg></div> */}
      <h1 className='md:heading1  text-xl font-bold flex md:flex-row flex-col flex-wrap  justify-center items-center gap-4 '> <span className="text-gradient_purple-blue rounded-md border-dotted p-2 border-4 border-indigo-200">We Provide</span> <span className='flex gap-2 justify-center items-center'> <Code2 className='text-emerald-400 md:h-20 md:w-20 h-10  w-10' /> Coding Articles</span>
        <span className='flex gap-2 justify-center items-center'> <FileCode className='text-yellow-400 md:h-20 md:w-20 h-10  w-10' />  Resources</span>
        <span className='flex gap-2 justify-center items-center'><Laptop className='text-cyan-500 md:h-20 md:w-20 h-10  w-10' />  Mentorship</span>
        <span className='flex gap-2 justify-center items-center'> <BrainCircuit className='text-indigo-400 md:h-20 md:w-20 h-10  w-10' />   Personalised AI </span> Together🚀.</h1>
      <desc className='md:base-bold text-lg text-center text-zinc-500  paddings mx-auto
'>
        All-in-one platform designed to empower computer science students.
      </desc>


      <div className='flex-center   mx-10 px-10'>

        <SignUp 
        afterSignUpUrl={"/"}
        />
      </div>

    </section>
  )

}