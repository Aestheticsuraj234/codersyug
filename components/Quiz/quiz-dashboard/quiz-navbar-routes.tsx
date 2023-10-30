"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Badge
} from "@/components/ui/badge"
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/Global/theme-toggle";

const QuizNavbarRoutes = () => {
  const router = useRouter();
  return (
    <div className="flex gap-x-4 ml-auto justify-center items-center ">
          <ThemeToggle/>

      <Badge
      onClick={()=>router.push("/")}
        className="text-gray-800 dark:text-gray-100 relative flex flex-row gap-2 bg-white dark:bg-zinc-800 justify-start border border-rose-400 items-center px-2 py-1 text-sm  hover:bg-red-500 hover:text-white cursor-pointer rounded-md font-semibold"
      >
        <LogOut size={16} />
        Exit
      </Badge>
      <UserButton
      afterSignOutUrl="/"
    
      />
    
    </div>
  )
}

export default QuizNavbarRoutes