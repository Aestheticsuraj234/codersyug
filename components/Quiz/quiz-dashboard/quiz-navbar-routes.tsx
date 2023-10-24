"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Badge
} from "@/components/ui/badge"

const QuizNavbarRoutes = () => {
  return (
    <div className="flex gap-x-2 ml-auto">
      <Badge
        className="text-gray-800 relative flex flex-row gap-2 bg-white justify-start border border-emerald-400 items-center px-2 py-1 text-sm  hover:bg-emerald-200 cursor-pointer rounded-md font-semibold"

      >
        <div className=" w-1.5 h-1.5 text-center  bg-green-400 rounded-full  mx-1 "></div>
        Online🎊
      </Badge>
      <UserButton />
    </div>
  )
}

export default QuizNavbarRoutes