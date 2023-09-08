"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/`,
      label: 'Home',
      active: pathname === `/`,
    },
   
    {
      href: `/blogs`,
      label: 'Blogs',
      active: pathname === `/blogs`,
    },
    {
      href: `/Resources`,
      label: 'Resources',
      active: pathname === `/Resources`,
    },
    {
      href: `/MockTests`,
      label: 'Mock-Tests',
      active: pathname === `/MockTests`,
    },
    {
      href: `/MentorshipPrograms`,
      label: 'Mentorship-Programs',
      active: pathname === `/MentorshipPrograms`,
    },
    {
      href: `/CodersYugAI`,
      label: ' CodersYug\'s AI',
      active: pathname === `/CodersYugAI`,
    },
   
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 z-50", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};