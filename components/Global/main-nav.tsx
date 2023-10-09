import Link from "next/link";


import { cn } from "@/lib/utils";
import Alert from "./alert";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  
  const MainNavroutes = [
    {
      href: `/`,
      label: 'Home',
      active: pathname === `/`,
      isInDevelopment: false,
    },
    {
      href: `/blogs`,
      label: 'Blogs',
      active: pathname === `/blogs`,
      isInDevelopment: false,
    },
    {
      href: `/resources`,
      label: 'Resources',
      active: pathname === `/resources`,
      isInDevelopment: false,
    },
    {
      href: `/MockTests`,
      label: 'Mock-Tests',
      active: pathname === `/MockTests`,
      isInDevelopment: true,
    },
    {
      href: `/MentorshipPrograms`,
      label: 'Mentorship-Programs',
      active: pathname === `/MentorshipPrograms`,
      isInDevelopment: true,
    },
    {
      href: `/CodersYugAI`,
      label: 'CodersYug\'s AI',
      active: pathname === `/CodersYugAI`,
      isInDevelopment: true,
    },
  ];
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 z-50", className)}
      {...props}
    >
      {MainNavroutes.map((route) => (
        // Conditionally render the Link component
        !route.isInDevelopment ? (
          <Link key={route.href} href={route.href} passHref>
            <span
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
              )}
            >
              {route.label}
            </span>
          </Link>
        ) : (
          // Render a disabled link with a title attribute explaining it's in development
          <span
            key={route.href}
            className={cn(
              'text-sm font-medium text-muted-foreground cursor-not-allowed',
              route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
            )}
            title="This page is in development"
          >
            <Alert
              triggertext={route.label}
              title={`${route.label} is still in development🔥`}
              description={`📢 Stay tuned for more updates and features! 💡 We'll notify you soon.`}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
              )}

            />
          </span>
        )
      ))}
    </nav>
  );
}
