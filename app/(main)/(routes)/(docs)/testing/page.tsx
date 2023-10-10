import ProjectCard from '@/components/Resources/project-card'
import { ResourceAccessType } from '@prisma/client'
import React from 'react'

const TestingPage = () => {
  return (
    <div className='nav-padding flex-center paddings'>
    <ProjectCard
    Title="this is testing title for checking the card"
    Thumbnail='/project.webp'
    TechStacks={['React', 'Next.js', 'TypeScript','figma ','prisma','tailwindcss','vercel']}
    type='Project'
    slug='test'
    price={0}
    accessType={ResourceAccessType.PAID}
    previewLink='https://google.com'
    sourceCodeLink='https://google.com'
    author={{userId: 'test'}}   
    downloadNumber={98} 

    />
    </div>
  )
}

export default TestingPage