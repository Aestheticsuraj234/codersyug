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
      href: `/${params.storeId}`,
      label: 'Home',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/About`,
      label: 'About',
      active: pathname === `/${params.storeId}/About`,
    },
    {
      href: `/${params.storeId}/Blogs`,
      label: 'Blogs',
      active: pathname === `/${params.storeId}/Blogs`,
    },
    {
      href: `/${params.storeId}/Resources`,
      label: 'Resources',
      active: pathname === `/${params.storeId}/Resources`,
    },
    {
      href: `/${params.storeId}/MockTests`,
      label: 'Mock-Tests',
      active: pathname === `/${params.storeId}/MockTests`,
    },
    {
      href: `/${params.storeId}/MentorshipPrograms`,
      label: 'Mentorship-Programs',
      active: pathname === `/${params.storeId}/MentorshipPrograms`,
    },
    {
      href: `/${params.storeId}/CodersYugAI`,
      label: ' CodersYug\'s AI',
      active: pathname === `/${params.storeId}/CodersYugAI`,
    },
   
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
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