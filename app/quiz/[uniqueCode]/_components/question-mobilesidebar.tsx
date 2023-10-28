import React from 'react'
import { Quiz , Question } from "@prisma/client"
import {
    Sheet,
    SheetContent,
    SheetTrigger
  } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import QuestionSidebar from './question-sidebar';

interface props {
    quiz: Quiz & {
        questions: Question[]
    }
}

const QuestionMobileSidebar = ({
    quiz
}:props) => {
  return (
    <Sheet>
    <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
      <Menu />
    </SheetTrigger>
    <SheetContent side="left" className="p-0 bg-white w-72">
      <QuestionSidebar quiz={quiz} />
    </SheetContent>
  </Sheet>
  )
}

export default QuestionMobileSidebar