"use client";

import { UserButton } from "@clerk/nextjs";


const QuizNavbarRoutes = () => {
  return (
    <div className="lex gap-x-2 ml-auto">
        <UserButton/>
    </div>
  )
}

export default QuizNavbarRoutes