import React from 'react';
import { auth } from "@clerk/nextjs";
import { Quiz, Question, AccessLevel } from "@prisma/client";
import { redirect } from "next/navigation";

import { getCurrentUserQuestionAccessLevel } from '@/server-action/quiz';
import { QuestionSidebarItem } from './question-sidebar-item';

interface QuestionWithAccess extends Question {
  userQuestionAccess: {
    accessLevel: AccessLevel;
  }
}

interface QuestionSidebarProps {
  quiz: Quiz & {
    questions: QuestionWithAccess[];
  }
}

const QuestionSidebar = async ({
  quiz
}: QuestionSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white dark:bg-zinc-800">
      <div className="p-[12.5px] flex flex-col border-b">
        <h1 className="font-semibold">
          {quiz.title}
        </h1>
      </div>
      <div className="flex flex-col w-full">
        {quiz.questions.map(async (question, index) => {
          // Fetch the user's access level for each question separately
          const userAccess = await getCurrentUserQuestionAccessLevel(question.id)

          return (
            <QuestionSidebarItem
              key={question.id}
              id={question.id}
              uniqueCode={quiz.uniqueCode}
              title={question.text}
              isLocked={userAccess === AccessLevel.LOCKED}
              accessLevel={userAccess || AccessLevel.LOCKED}
            />
          );
        })}
      </div>
    </div>
  );
}

export default QuestionSidebar;
