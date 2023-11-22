"use server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";


export const GetNumberQuizParticipated = async () => {
  const profile = await currentProfile();
  const numberOfQuizParticipated = await db.quizParticipation.count({
    where: {
      userId: profile?.userId,
    },
  });

  return numberOfQuizParticipated;
};

export const GetNumberQuestionAttempted = async () => {
  const profile = await currentProfile();
  const numberOfQuestionAttempted = await db.userQuestionAccess.count({
    where: {
      userId: profile?.userId,
    },
  });

  return numberOfQuestionAttempted;
};


