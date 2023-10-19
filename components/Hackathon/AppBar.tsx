import React from 'react';
import { GraduationCap, Rocket, Scale, ShieldQuestion, Store, Trophy } from 'lucide-react';

const AppBar = () => {
    const HackathonNavItems = [
        {
            href: "#prizes",
            label: "Prizes",
            active: false,
            icon: <Trophy className='text-yellow-500' />,
        },
        {
            href: "#about",
            label: "About CodersYug",
            active: false,
            icon: <Store className='text-indigo-400' />,
        },
        {
            href: "#rules",
            label: "Rules",
            active: false,
            icon: <Scale  className='text-pink-500'/>,
        },
        {
            href: "#faq",
            label: "FAQ",
            active: false,
            icon: <ShieldQuestion className='text-orange-400' />,
        },
        {
            href: "#sponsors",
            label: "Sponsors",
            active: false,
            icon: <Rocket className='text-blue-400' />,
        },
        {
            href: "#how-to-participate",
            label: "How to Participate",
            active: false,
            icon: <GraduationCap className='text-green-600' />,
        },
    ];

    return (
        <div className="z-50 w-full py-6 px-5 flex  md:flex-row flex-col overflow-x-auto  justify-around md:items-center items-start space-y-7 md:space-y-0 bg-gray-800 border-emerald-300 border rounded-2xl">
            {HackathonNavItems.map((route) => (
                <a key={route.href} href={route.href}>
                    <span
                        className={`text-sm font-medium flex flex-row justify-center items-center gap-2 transition-colors hover:text-primary ${
                            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
                        }`}
                    >
                        {route.icon}
                        {route.label}
                    </span>
                </a>
            ))}
        </div>
    );
};

export default AppBar;
