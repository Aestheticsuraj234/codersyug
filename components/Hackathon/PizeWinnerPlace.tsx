'use client';
import { MapPin, MessageSquarePlus, Paperclip, PhoneCall } from 'lucide-react';
import React from 'react';
import {
    Card,
    CardContent,

    CardHeader,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';



const PrizeDetails = [
    {
        Icon: "🥇",
        Title: "1st Prize",
        description: "Keyboard + Mouse + T-shirt + Certificate",
        textGradient: "bg-gradient-to-r dark:from-yellow-200 from-yellow-400 dark:via-yellow-400  via-yellow-500 dark:to-yellow-700   to-yellow-800 bg-clip-text text-transparent",
        iconBackground: "bg-yellow-400"

    },
    {
        Icon: "🥈",
        Title: "2nd Prize",
        description: "Laptop Stand + T-shirt + Certificate",
        textGradient: "bg-gradient-to-r dark:from-gray-200 from-gray-400  via-gray-700 dark:via-gray-400 to-gray-600  bg-clip-text text-transparent",
        iconBackground: "bg-gray-400"

    },
    {
        Icon: "🥉",
        Title: "3rd Prize",
        description: " Coding-Stickers +  T-shirt + Certificate",
        textGradient: "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-orange-900 dark:via-amber-100 via-amber-400 to-orange-900 bg-clip-text text-transparent",
        iconBackground: "bg-amber-600"

    },
    {
        Icon: "4️⃣",
        Title: "4th Prize",
        description: " T-shirt + Certificate",
        textGradient: "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] dark:from-yellow-200 from-yellow-400 dark:via-emerald-200 via-emerald-300 dark:to-yellow-200 to-yellow-300 bg-clip-text text-transparent",
        iconBackground: "bg-emerald-400"

    },
    {
        Icon: "5️⃣",
        Title: "5th Prize",
        description: " T-shirt + Certificate",
        textGradient: "bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent",
        iconBackground: "bg-blue-400"

    },
];

const PrizeWinnerPlace = () => {
    return (
        <section
            className='flex flex-col space-y-5 px-4 py-10 mt-5 mb-5'

        >
            <h1
                className='items-center justify-center flex text-center mt-9 font-extrabold md:text-4xl text-3xl bg-gradient-to-r 
                from-gray-700 via-gray-900 to-black dark:from-yellow-300 dark:to-green-600 bg-clip-text text-transparent '

            >
                Rewards and prizes for winners
            </h1>
            <h4
                className='items-center justify-center uppercase flex text-center font-bold text-sm dark:text-gray-400 text-zinc-600'

            >
                Participants with the most correct answers in the quiz will be awarded the following prizes according to their rank🔥.
            </h4>

            <div
                className="flex flex-col items-center md:flex-row justify-between gap-4 mt-12"

            >
                {PrizeDetails.map((item, index) => (
                    <Card key={index} className='h-[16rem] md:w-auto  w-full flex-1 dark:bg-gray-800 bg-zinc-100 border rounded-md flex flex-col justify-between items-center '>
                        <CardHeader className={cn(' h-auto w-auto  px-4 mt-1 rounded-md justify-center items-center text-3xl', item.iconBackground)}>
                            {item.Icon}
                        </CardHeader>
                        <div className='flex flex-col justify-between items-start'>
                            <CardContent>
                                <h1
                                    className={cn('text-xl font-bold ', item.textGradient)}
                                >
                                    {item.Title}
                                </h1>

                                <span className='text-sm font-medium text-zinc-00'>{item.description}</span>
                            </CardContent>

                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default PrizeWinnerPlace;