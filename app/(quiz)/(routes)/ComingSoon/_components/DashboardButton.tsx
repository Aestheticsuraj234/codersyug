"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

const DashboardButton = () => {
    const router = useRouter();
  return (
    <Button onClick={()=>router.push("/quizmain")} className=" md:font-extrabold  font-semibold text-center ">
    Let's go  to Dashboard
  </Button>
  )
}

export default DashboardButton