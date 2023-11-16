import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

// Function to remove punctuation and normalize text
const removePunctuationAndNormalize = (text: any): any => {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().trim();
};

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
    console.log(answeredQuestions, uniqueCode);

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

    // Iterate through each question in the quiz.
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];

      // Check if the user's answer is correct for the question.
      if (Array.isArray(answeredQuestions) && answeredQuestions[i] && answeredQuestions[i].answer) {
        const userAnswerNormalized = removePunctuationAndNormalize(answeredQuestions[i].answer);
        const correctAnswerNormalized = removePunctuationAndNormalize(question.correctOption);

        if (userAnswerNormalized === correctAnswerNormalized) {
          // Increment the user's score by 10 for each correct answer.
          totalScore += 10;
        }
      }

      // Sum up the total time taken for all questions.
      if (answeredQuestions[i]?.timeTaken) {
        totalTimeTaken += answeredQuestions[i].timeTaken;
      }
    }

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

    // Return a success response.
    return new NextResponse("Quiz submitted successfully", { status: 201 });
  } catch (error: any) {
    // Handle any errors and return an error response.
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
};
