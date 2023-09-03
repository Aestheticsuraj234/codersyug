import React from 'react'
import FeatureCard from './FeatureCard'



const FeatureComponent = () => {
  return (
    <section className='flex flex-1 justify-center text-center flex-col'>
      {/* heading */}
      <h2 className="text-center mb-5 font-bold text-xl text-zinc-500">Designed to empower computer science students. </h2>

      <h1 className='text-center mb-5 font-extrabold md:text-5xl text-3xl  bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400'>Connect, Collaborate, <span className='bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400'>Build Your Career</span> </h1>

      <div className='flex md:justify-around justify-normal items-center md:flex-row flex-col space-y-4   md:space-x-4'>
        <FeatureCard />
      </div>
    </section>
  )
}

export default FeatureComponent