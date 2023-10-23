"use client";

import { BarChart4, Compass, Layout, Trophy, User } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const Routes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/quizmain/dashboard",
    },
    {
        icon: Compass,
        label: "Your Quizzes",
        href: "/quizmain/your-quizzes"
    },
    {
        icon:BarChart4,
        label:"Leaderboard",
        href:"/quizmain/leaderboard"
    },
    {
        icon:Trophy,
        label:"Prizes",
        href:"/quizmain/prizes"
    },
    {
        icon:User,
        label:"Profile",
        href:"/quizmain/profile"
    }
]

const SidebarRoutes = () => {
    const routes = Routes
    return (
        <div className='flex flex-col w-full '>
                {
                    routes.map((route)=>(
                        <SidebarItem 
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                        />
                    ))
                }
        </div>
    )
}

export default SidebarRoutes