import { Quiz , Question } from "@prisma/client"

import React from 'react'
import QuestionMobileSidebar from "./question-mobilesidebar"
import QuizNavbarRoutes from "@/components/Quiz/quiz-dashboard/quiz-navbar-routes"

interface QuestionNavbarProps {
    quiz: Quiz & {
        questions: Question[]
    }
}

const QuestionNavbar = ({
    quiz
}:QuestionNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
    <QuestionMobileSidebar quiz={quiz} />
    <QuizNavbarRoutes />      
  </div>
  )
}

export default QuestionNavbar