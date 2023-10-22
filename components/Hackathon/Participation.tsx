"use client"

import React from 'react'

const Participation = () => {
    const Participate = [
        {
          id: 1,
          step: '1',
          title: '📝 Register',
          description: 'One-click registration to get your unique code.'
        },
        {
          id: 2,
          step: '2',
          title: '📧 Check Email',
          description: 'Find your quiz code in your inbox and save it.'
        },
        {
          id: 3,
          step: '3',
          title: '🤝 Join Channels',
          description: 'Join our Telegram & WhatsApp channels for updates.'
        },
        {
          id: 4,
          step: '4',
          title: '🔗 Enter Code',
          description: 'Click the link and enter your quiz code to start.'
        },
        {
          id: 5,
          step: '5',
          title: '🤔 Answer Questions',
          description: 'Test your knowledge and win exciting prizes.'
        },
        {
          id: 6,
          step: '6',
          title: '🏆 Winners Revealed',
          description: 'Stay updated on social media and the leaderboard for winners.'
        },
      ];
      

    return (
        <section id="how-to-participate" className=' w-full flex flex-col justify-center items-center gap-4 mt-36'>
            <h1 className='text-2xl font-bold text-center  dark:text-white text-gray-700  md:text-4xl'>How to Participate?</h1>
            <div className='flex flex-col justify-between items-start mt-10 space-y-4'>
                {Participate.map((item) => (
                    <div key={item.id} className='flex w-full flex-row items-center gap-5 p-5 sm:p-6 dark:bg-gray-900 bg-zinc-100 border border-slate-200 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600 dark:border-slate-800/80'>
                        <div className="flex flex-row items-center justify-center flex-shrink-0 w-16 h-16 dark:bg-gray-800 bg-zinc-200 rounded-full sm:w-20 sm:h-20">
                            <span className="text-2xl font-bold text-gradient ">{item.step}</span>
                        </div>
                        <div className="flex flex-col items-start justify-center flex-1 space-y-1">
                            <h3 className="text-lg font-semibold dark:text-gray-100  text-gray-700">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Participation;
