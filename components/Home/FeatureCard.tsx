import Image from 'next/image'
import React from 'react'

const FeatureCard = () => {
    const FeatureItem = [
        {
            "id": 1,
            "title": "Unrivaled Community",
            "description": "Sigma-Node provides an unparalleled community of passionate software developers who are eager to connect, collaborate, and share their expertise. Engage with like-minded individuals, expand your network, and foster meaningful connections that can fuel your professional growth..",
            "image": "/assests/communitys.svg"
        },
        {
            "id": 2,
            "title": "Diverse Content Formats",
            "description": "With Sigma-Node, you gain access to a diverse range of content formats tailored to suit your preferences and learning style. Dive into thought-provoking posts, insightful blogs, bite-sized shorts, and engaging podcasts, ensuring you stay up-to-date with the latest tech trends and expand your knowledge in the most convenient way possible.",
            "image": "/assests/social_life.svg"
        },
        {
            "id": 3,
            "title": "Cutting-Edge Tech Insights",
            "description": "Stay at the forefront of the ever-evolving tech landscape with Sigma-Node's focus on delivering the most cutting-edge tech news and trends. Gain valuable insights into emerging technologies, industry best practices, and innovative solutions that can give you a competitive edge in your software development journey.",
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