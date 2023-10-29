"use client";

import { BarChart4, Compass, Layout, Trophy, User, ShieldCheck } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useUser } from "@clerk/nextjs";

const Routes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/quizmain",
  },
  {
    icon: Compass,
    label: "Your Quizzes",
    href: "/quizmain/quizzes"
  },
  {
    icon: BarChart4,
    label: "Leaderboard",
    href: "/quizmain/leaderboard"
  },
  {
    icon: Trophy,
    label: "Prizes",
    href: "/quizmain/prizes"
  },
  {
    icon: User,
    label: "Profile",
    href: "/quizmain/profile"
  },
  {
    icon: ShieldCheck,
    label: "Create Quiz",
    href: "/quizmain/create-quiz",
    hidden: true
  }
];

const SidebarRoutes = () => {
  const routes = Routes;
  const { user } = useUser();
  const isAdmin = user?.emailAddresses.find((email) => email.emailAddress === 'codersyug@gmail.com');

  return (
    <div className='flex flex-col w-full '>
      {routes.map((route) => {
        if (route.hidden && !isAdmin) {
          return null; // Skip rendering the "Create Quiz" route if it's hidden and the user is not an admin
        }

        return (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        );
      })}
    </div>
  );
};

export default SidebarRoutes;
