import Image from 'next/image'
import React from 'react'

const FeatureCard = () => {
    const FeatureItem = [
        {
            "id": 1,
            "title": "Unrivaled Community",
            "description": "CodersYug provides an unparalleled community of passionate software developers who are eager to connect, collaborate, and share their expertise. Engage with like-minded individuals, expand your network, and foster meaningful connections that can fuel your professional growth..",
            "image": "/assests/communitys.svg"
        },
        {
            "id": 2,
            "title": "Mentorship Programs",
            "description": "The platform facilitates mentorship programs where experienced professionals and professors can mentor students, offering guidance on career development, project ideas, and skill enhancement",
            "image": "/assests/social_life.svg"
        },
        {
            "id": 3,
            "title": "Online Study Groups",
            "description": " CodersYug facilitates the formation of virtual study groups, connecting students based on their courses and interests. It includes integrated video conferencing and collaboration tools.",
            "image": "/assests/socail_life.svg"
        }
    ]
    return (
        <>
            {FeatureItem.map((item) => (
                <div key={item.id} className="max-w-lg  
                
                h-180
                glassmorphism border flex 
                flex-col
                jusitfy-center
                items-center
                my-5
                rounded-lg m-3 shadow dark:bg-[#0f172a] dark:border-gray-700">

                    <Image className="
                    rounded-lg
                    mt-5
                    
                    " src={item.image} alt=""
                        height={250}
                        width={250}

                    />

                    <div className="p-5">

                        <h5 className="mb-2 text-2xl bg-clip-text text-transparent font-bold tracking-tight text-center  bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400">{item.title}</h5>

                        <p className="max-w-2xl mb-6 font-medium text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-100">{item.description}</p>

                    </div>
                </div>
            ))}
        </>
    )
}

export default FeatureCard