import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

const QuestionUniqueCodePage = async ({
  params
}: {
  params: { uniqueCode: string };
}) => {
  const { userId } = auth();

  // Fetch the quiz by its unique code
  const quiz = await db.quiz.findUnique({
    where: {
      uniqueCode: params.uniqueCode
    },
    include: {
      questions: {
        orderBy: {
          order: "asc"
        }
      }
    }
  });

  if (!quiz) {
    return redirect("/");
  }

  // Check if the user is logged in
  if (!userId) {
    return redirect("/sign-in");
  }

  // Update the quiz to connect the user as a quiz participant
  const updatedQuiz = await db.quiz.update({
    where: {
      uniqueCode: params.uniqueCode
    },
    data: {
      quizParticipations: {
        connect: {
          userId: userId
        }
      }
    }
  });

  if (!updatedQuiz) {
    // Handle any error that might occur during the update
    return redirect("/");
  }

  // Redirect to the first question of the quiz
  return redirect(`/quiz/${params.uniqueCode}/questions/${quiz.questions[0].id}`);
};

export default QuestionUniqueCodePage;
