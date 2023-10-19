import React from 'react'
import PrizeCard from './PrizeCard'

const Prize = () => {
    return (
        <section id='prizes' className='flex flex-col justify-between items-center mt-20'>
            <h1 className='
        text-2xl
        font-bold
        text-center
       
        text-white
        md:text-4xl

        '>Rewards and prizes</h1>
            <span className='py-10 text-gray-500 font-bold'>Most Correct Answers in <code>Quiz</code></span>
            <PrizeCard />
        </section>
    )
}

export default Prize