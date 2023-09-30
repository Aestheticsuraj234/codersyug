import React from 'react'
import Image from 'next/image'

const Empty = () => {
    return (
        <div className=' flex flex-col justify-center  items-center   mt-10  mx-auto'>
            <h1 className='text-4xl font-bold mb-10'>Nothing to show here👋</h1>
            <Image
                src={"/empty.svg"}
                alt="empty"
                width={300}
                height={300}
                className="object-cover rounded-lg mt-1"
                objectFit="cover"
            />
        </div>


    )
}

export default Empty