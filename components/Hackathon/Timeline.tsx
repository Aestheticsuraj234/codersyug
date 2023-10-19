import React from 'react'

const Timeline = () => {
    return (
        <section  className='w-full  bg-gray-900 px-4 py-2 mt-20 rounded-md  border-2 border-emerald-300  flex flex-col md:flex-row justify-between items-center'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='
                text-2xl
                font-bold
                text-white
                '>Nov 10 - Nov 20</h1>
                <span>Dates</span>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='
                text-2xl
                font-bold
                text-white
                '>15 days : 23 hrs</h1>
                <span>Ends in
                </span>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='
                text-2xl
                font-bold
                text-white
                '>717</h1>
                <span>Students registered</span>
            </div>
        </section>
    )
}

export default Timeline