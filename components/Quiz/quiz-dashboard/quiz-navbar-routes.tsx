"use client";
import { UserButton } from "@clerk/nextjs";
import { Home } from "lucide-react";
import { ThemeToggle } from "@/components/Global/theme-toggle";
import Link from "next/link";
import { useEffect, useState } from "react";

const QuizNavbarRoutes = () => {
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="flex gap-x-4 ml-auto justify-center items-center ">
          <ThemeToggle/>

      <Link
      href={"/"}
        className="text-gray-800 dark:text-gray-100 relative flex flex-row gap-2 bg-white dark:bg-zinc-800 justify-start border border-rose-400 items-center px-2 py-1 text-sm  hover:bg-red-500 hover:text-white cursor-pointer rounded-md font-semibold"
      >
        <Home size={16} />
        Home
      </Link>
      <UserButton
      afterSignOutUrl="/"
    
      />
    
    </div>
  )
}

export default QuizNavbarRoutes