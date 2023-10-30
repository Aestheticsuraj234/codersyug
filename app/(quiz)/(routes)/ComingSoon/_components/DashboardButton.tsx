"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

const DashboardButton = () => {
    const router = useRouter();
  return (
    <Button onClick={()=>router.push("/quizmain")} className=" font-extrabold text-center ">
    Let's go  to Dashboard
  </Button>
  )
}

export default DashboardButton