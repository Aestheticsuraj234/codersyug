import React from 'react'
import { auth } from "@clerk/nextjs";
import { Quiz, Question } from "@prisma/client"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { QuestionSidebarItem } from './question-sidebar-item';

interface QuestionSidebarProps {
    quiz: Quiz & {
        questions: Question[]
    }
}

const QuestionSidebar = ({
    quiz
}: QuestionSidebarProps) => {

    const { userId } = auth();

    if (!userId) {
      return redirect("/sign-in");
    }
  
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-[12.5px] flex flex-col border-b">
          <h1 className="font-semibold">
            {quiz.title}
          </h1>

         
        </div>
        <div className="flex flex-col w-full">
          {quiz.questions.map((question) => (
            <QuestionSidebarItem
              key={question.id}
              id={question.id}
              uniqueCode={quiz.uniqueCode}
            title={question.text}
            isLocked={false}

            />
          ))}
        </div>
      </div>
    )
}

export default QuestionSidebar