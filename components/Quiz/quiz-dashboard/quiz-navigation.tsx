import React from 'react'
import MobileSidebar from './mobile-sidebar'
import QuizNavbarRoutes from './quiz-navbar-routes'

const QuizNavigationbar = () => {
  return (
    <div className='p-4 border-b h-full flex  items-center bg-white dark:bg-zinc-800 shadow-sm'>
            <MobileSidebar/>
            <QuizNavbarRoutes/>
    </div>
  )
}

export default QuizNavigationbar