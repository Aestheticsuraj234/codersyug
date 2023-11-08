import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

/**
 * Handle a POST request to submit a quiz.
 *
 * @param {Request} req - The HTTP request.
 * @returns {Promise<NextResponse> } - The HTTP response.
 */
export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Retrieve the user's profile.
    const profile = await currentProfile();

    // Check if the user is not authenticated.
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract the answers and unique code from the request body.
    const { answers, uniqueCode } = await req.json();

    // Find the quiz associated with the unique code.
    const quiz = await db.quiz.findFirst({
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

    // Iterate through each question in the quiz.
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];

      // Check if the user's answer is correct for the question.
      if (question.correctOption === answers[i]) {
        // Increment the user's score by 10 for each correct answer.
        await db.quizParticipation.update({
          where: {
            quizId: quiz.id,
            userId: profile.userId,
          },
          data: {
            score: {
              increment: 10,
            },
            totalTimeTaken: {
              set: answers[i].timeTaken,
            },
          },
        });
      } else if (question.correctOption !== answers[i]) {
        // Update the user's total time taken for each question.
        await db.quizParticipation.update({
          where: {
            quizId: quiz.id,
            userId: profile.userId,
          },
          data: {
            totalTimeTaken: {
              set: answers[i].timeTaken,
            },
          },
        });
      } else {
        // Reset the user's score and total time taken for the question.
        await db.quizParticipation.update({
          where: {
            quizId: quiz.id,
            userId: profile.userId,
          },
          data: {
            score: null,
            totalTimeTaken: null,
          },
        });
      }
    }

    // Return a success response.
    return new NextResponse("Quiz submitted successfully", { status: 201 });
  } catch (error: any) {
    // Handle any errors and return an error response.
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
};
