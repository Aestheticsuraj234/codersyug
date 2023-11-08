"use server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { Quiz, Question, AccessLevel } from "@prisma/client";

export const getQuiz = async () => {
  const quiz = await db.quiz.findMany({
    include: {
      questions: true,
    },
  });

  return quiz;
};

export const getQuizByUniqueCode = async (uniqueCode: string) => {
  const quiz = await db.quiz.findUnique({
    where: {
      uniqueCode,
    },
    include: {
      questions: true,
    },
  });

  return quiz;
};

export const getAllParticipants = async () => {
  const participants = await db.quizParticipation.findMany({
    include: {
      user: true,
    },
  });
  return participants;
};

export const getQuestionById = async (
  questionId: string,
  uniqueCode: string
) => {
  const profile = await currentProfile();
  if (!profile?.userId) {
    // Handle the case when the user is not logged in or doesn't have a userId
    return {
      question: null,
      nextQuestion: null,
    };
  }

  const question = await db.question.findUnique({
    where: {
      id: questionId,
      quiz: {
        uniqueCode,
      },
    },
  });

  if (!question) {
    return {
      question: null,
      nextQuestion: null,
    };
  }

  const userQuestionAccess = await db.userQuestionAccess.findUnique({
    where: {
      userId_questionId: {
        userId: profile.userId,
        questionId: questionId,
      },
    },
  });

  // Check if the user doesn't have access to the current question
  if (!userQuestionAccess) {
    const accessLevel =
      question.order === 1 ? AccessLevel.UNLOCKED : AccessLevel.LOCKED;
    await db.userQuestionAccess.create({
      data: {
        userId: profile.userId,
        questionId: questionId,
        accessLevel: accessLevel,
      },
    });
  }

  let nextQuestion: Question | null = null;

  if (
    !userQuestionAccess ||
    userQuestionAccess.accessLevel !== AccessLevel.ANSWERED
  ) {
    // Find the next question within the same quiz
    nextQuestion = await db.question.findFirst({
      where: {
        quiz: {
          uniqueCode,
        },
        order: {
          gt: question.order || 1,
        },
      },
      orderBy: {
        order: "asc",
      },
    });
  }

  return {
    question,
    nextQuestion,
  };
};

export const modifyQuestionAccessTypeByCurrentUser = async(
  questionId:string,

  accessLevel:AccessLevel
) => {
  const profile = await currentProfile();
  const userQuestionAccess = await db.userQuestionAccess.findUnique({
    where: {
      userId_questionId: {
        // @ts-ignore
        userId: profile.userId,
        questionId: questionId,
      },
    },
  });
  if(!userQuestionAccess) {
    await db.userQuestionAccess.create({
       // @ts-ignore
      data: {
        userId: profile?.userId,
        questionId: questionId,
        accessLevel: accessLevel,
      },
    });
    return;
  }


  await db.userQuestionAccess.update({
    where: {
      userId_questionId: {
        // @ts-ignore
        userId: profile.userId,
        questionId: questionId,
      },
    },
    data: {
      accessLevel: accessLevel,
    },
  })

};

export const GetNumberOfQuestions = async (uniqueCode: string) => {
  const quiz = await db.question.count({
    where: {
      quiz: {
        uniqueCode,
      },
    },
  });
  return quiz;
};

export const getCurrentUserQuestionAccessLevel = async (questionId: string) => {
  const profile = await currentProfile();
  if (!profile?.userId) {
    // Handle the case when user is not logged in or doesn't have a userId
    return null;
  }

  // Check if the user has access to this question
  const userQuestionAccess = await db.userQuestionAccess.findFirst({
    where: {
      userId: profile.userId, // Ensure profile?.userId is defined
      questionId: questionId,
    },
  });

  return userQuestionAccess?.accessLevel;
};
