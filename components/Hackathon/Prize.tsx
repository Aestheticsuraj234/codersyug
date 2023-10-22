import React from 'react'
import PrizeCard from './PrizeCard'
import PrizeWinnerPlace from './PizeWinnerPlace'

const Prize = () => {
    return (
        <section id='prizes' className='flex flex-col justify-between items-center space-y-4 mt-20'>
            <h1 className='
        text-2xl
        font-bold
        text-center
        dark:text-white
        text-gray-800
       
       
        md:text-4xl

        '>Rewards and prizes</h1>
            <span className='py-10 text-gray-500 font-bold'>Most Correct Answers in <code className='dark:bg-gray-800 dark:text-white text-gray-800 bg-lime-50 px-2 py-1 rounded-sm'>Quiz</code></span>
            <PrizeCard />
            <PrizeWinnerPlace/>
        </section>
    )
}

export default Prize