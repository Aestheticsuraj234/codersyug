import Image from 'next/image'
import React from 'react'

const ImageBanner = () => {
  return (
    <div className='flex justify-center items-center px-2 py-2'>
        <Image
        src="/quizMainBanner.svg"
        alt="Quiz Main Banner"
        width={800}
        height={300}
        />
    </div>
  )
}

export default ImageBanner