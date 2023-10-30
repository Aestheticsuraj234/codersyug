import React from 'react'
import { Logo } from './Logo'
import SidebarRoutes from './sidebar-routes'

const QuizMainSidebar = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-zinc-800 shadow-sm'>
            <div className='p-6'>
                <Logo/>
            </div>
            <div className='flex flex-col w-full'>
                <SidebarRoutes/>
            </div>
    </div>
  )
}

export default QuizMainSidebar