import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Retrieve the user's profile.
    const profile = await currentProfile();

    // Check if the user is not authenticated.
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract the answers and unique code from the request body.
    const { answeredQuestions, uniqueCode } = await req.json();

    // Find the quiz associated with the unique code.
    const quiz = await db.quiz.findUnique({
      where: {
        uniqueCode,
      },
      include: {
        questions: true,
        quizParticipations: true,
      },
    });

    // Check if the quiz does not exist.
    if (!quiz) {
      return new NextResponse("Quiz Not found", { status: 404 });
    }

    // Check if the user is not allowed to submit this quiz.
    if (!quiz.quizParticipations.find((p) => p.userId === profile.userId)) {
      return new NextResponse("You are not allowed to submit this quiz", {
        status: 401,
      });
    }

    let totalScore = 0;
    let totalTimeTaken = 0;

    // Get all correct answers first
    const correctAnswers = quiz.questions.map((question) => ({
      questionId: question.id,
      correctOption: question.correctOption,
    }));

    // Calculate the total score and total time taken.
    correctAnswers.forEach((correctAnswer, i) => {
      const question = quiz.questions[i];

      // Check if the user's answer is correct for the question.
      if (
        Array.isArray(answeredQuestions) &&
        answeredQuestions[i] &&
        answeredQuestions[i].answer
      ) {
        const userAnswerNormalized = answeredQuestions[i].answer;

        // Check if the user's answer is among the correct options.
        const correctOptionIndex = correctAnswers.findIndex((correctAnswer) => {
          return correctAnswer.correctOption === userAnswerNormalized;
        });

        // Increment the score if the answer is correct.
        if (correctOptionIndex >= 0) {
          totalScore += 100;
        }
      }

      // Sum up the total time taken for all questions.
      if (answeredQuestions[i]?.timeTaken) {
        totalTimeTaken += answeredQuestions[i].timeTaken;
      }
    });

    // Update the user's score and total time taken.
    await db.quizParticipation.update({
      where: {
        quizId: quiz.id,
        userId: profile.userId,
      },
      data: {
        score: {
          increment: totalScore,
        },
        totalTimeTaken: {
          set: totalTimeTaken,
        },
      },
    });

    return new NextResponse(JSON.stringify(updatedParticipation), {
      status: 201,
  });
  } catch (error) {
    console.error("Backend_Error_❌", error);
    return new NextResponse("Internal Server Error", { status: 500 });
>>>>>>> development
  }
};
