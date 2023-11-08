import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"; // Import 'next/router' for navigation
import { db } from "@/lib/db";
import QuestionNavbar from "./_components/question-navbar";
import QuestionSidebar from "./_components/question-sidebar";

const QuizLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { uniqueCode: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const quiz = await db.quiz.findUnique({
    where: {
      uniqueCode: params.uniqueCode,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc", 
        },
        include:{
          userQuestionAccess: {
            where: {
              userId: userId,
            },
            select: {
              accessLevel: true,
            },
          },
        }
      },
      
    },
  });

  if (!quiz) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="h-[50px] md:pl-80 fixed inset-y-0 w-full z-50">
        <QuestionNavbar quiz={quiz} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        {/* @ts-ignore */}
        <QuestionSidebar quiz={quiz}  />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  );
};

export default QuizLayout;
