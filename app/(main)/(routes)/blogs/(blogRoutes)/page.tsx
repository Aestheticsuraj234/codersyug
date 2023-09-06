import BlogMainContainer from '@/components/Blogs/blog-main'
import BlogSideBar from '@/components/Blogs/blog-sidebar'
import React from 'react'

const Blogs = () => {
  return (
    <div className='flex flex-row '>
      <BlogSideBar  />
      <BlogMainContainer/>

    </div>
  )
}

export default Blogs