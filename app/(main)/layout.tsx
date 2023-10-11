import Footer from '@/components/Global/footer'
import Navbar from '@/components/Global/navbar'
import React from 'react'



const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default layout