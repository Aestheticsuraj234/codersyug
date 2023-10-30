import React from 'react'
import Link from 'next/link'
import { BiLogoWhatsapp } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
const WhatsAppButton = () => {
  return (
    <>
    <Link href={"https://chat.whatsapp.com/FSRSe9N8jte5TqZ8aR0QeF"} target='_blank'>
    <Button className='flex justify-center items-center gap-1 font-extrabold text-center '>
    <BiLogoWhatsapp className="text-2xl mr-2" />
    Quiz-Wuiz By Codersyug🚀
    </Button>
    </Link>
    </>
  )
}

export default WhatsAppButton