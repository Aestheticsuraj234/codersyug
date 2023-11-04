"use server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { Quiz, Question, AccessLevel } from "@prisma/client";




export const getQuiz = async () => {
    const quiz = await db.quiz.findMany({
        include: {
            questions: true
        }
    });

    return quiz;
};


export const getQuizByUniqueCode = async (uniqueCode: string) => {
    const quiz = await db.quiz.findUnique({
        where: {
            uniqueCode
        },
        include: {
            questions: true
        }
    });

    return quiz;
}

export const getQuestionById = async (questionId: string, uniqueCode: string) => {
    const question = await db.question.findUnique({
        where: {
            id: questionId,
            quiz: {
                uniqueCode
            }
        }
    });
   
    let nextQuestion: Question | null = null;

    if (question) {
        // Check if the question's access level is ANSWERED, and if not, update it to UNLOCKED
        if (question.accessLevel !== AccessLevel.ANSWERED) {
            await db.question.update({
                where: {
                    id: questionId,
                },
                data: {
                    accessLevel: AccessLevel.UNLOCKED,
                },
            });
        }
        
        nextQuestion = await db.question.findFirst({
            where: {
                quiz: {
                    uniqueCode
                },
                order: {
                    gt: question.order || 1,
                }
            },
            orderBy: {
                order: "asc",
            }
        });
    }

    return {
        question,
        nextQuestion
    };
}





export const getAllParticipants = async () => {
    const participants = await db.quizParticipation.findMany({
        include: {
            user: true
        }
    });
    return participants;
}

export const questionAccessType = async (questionId: string) => {
    const question = await db.question.findUnique({
      where: {
        id: questionId
      },
      select: {
        accessLevel: true
      }
    });
  
    return question?.accessLevel || AccessLevel.LOCKED;
  };
  

export const modifyAccessLevel = async (questionId: string, accessLevel: AccessLevel) => {
    try {
      // Check if the question exists
      const question = await db.question.findUnique({
        where: {
          id: questionId,
        },
        select: {
          accessLevel: true,
        },
      });
  
      if (!question) {
        throw new Error("Question not found");
      }
  
      if (question.accessLevel === AccessLevel.ANSWERED) {
        return "Question is already answered.";
      }
  
      // Ensure that the provided accessLevel is valid (either "UNLOCKED" or "ANSWERED")
      if (![AccessLevel.UNLOCKED, AccessLevel.ANSWERED , AccessLevel.LOCKED].includes(accessLevel)) {
        throw new Error("Invalid access level.");
      }
  
      if (question.accessLevel === AccessLevel.UNLOCKED) {
        await db.question.update({
          where: {
            id: questionId,
          },
          data: {
            accessLevel: AccessLevel.ANSWERED,
          },
        });
  
        return "Question access level updated successfully.";
      } else {
        throw new Error("Invalid access level modification.");
      }
    } catch (error) {
      console.error("Error in modifyAccessLevel:", error);
      throw new Error("Failed to modify question access level.");
    }
  };
  

  export const GetNumberOfQuestions = async (uniqueCode: string) => {
    const quiz = await db.question.count({
      where: {
        quiz: {
          uniqueCode
        }
      }
    })
    return quiz;
  }