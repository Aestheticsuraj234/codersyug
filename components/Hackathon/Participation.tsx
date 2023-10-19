"use client"

import React from 'react'

const Participation = () => {
    const Participate = [
        {
            id: 1,
            step: '1',
            title: 'Register',
            description: 'Register yourself for the hackathon by filling the form.',
        },
        {
            id: 2,
            step: '2',
            title: 'Participate',
            description: 'Participate in the hackathon by solving the problems.',
        },
        {
            id: 3,
            step: '3',
            title: 'Win',
            description: 'Win exciting prizes and goodies.',
        },
        {
            id: 4,
            step: '4',
            title: 'Certificate',
            description: 'Get a certificate of participation.',
        }
    ]

    return (
        <section id="how-to-participate" className=' w-full flex flex-col justify-center items-center gap-4 mt-36'>
            <h1 className='text-2xl font-bold text-center text-white md:text-4xl'>How to Participate?</h1>
            <div className='flex flex-col justify-between items-start mt-10 space-y-4'>
                {Participate.map((item) => (
                    <div key={item.id} className='flex w-full flex-row items-center gap-5 p-5 sm:p-6 bg-gray-900 border border-slate-200 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600 dark:border-slate-800/80'>
                        <div className="flex flex-row items-center justify-center flex-shrink-0 w-16 h-16 bg-gray-800 rounded-full sm:w-20 sm:h-20">
                            <span className="text-2xl font-bold text-gradient ">{item.step}</span>
                        </div>
                        <div className="flex flex-col items-start justify-center flex-1 space-y-1">
                            <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Participation;
