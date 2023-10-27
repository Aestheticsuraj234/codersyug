"use server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import {Quiz , Question} from "@prisma/client";




export const getQuiz = async () => {
    const quiz = await db.quiz.findMany({
        include: {
            questions: true
        }
    });
    console.log(quiz);
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
    console.log(quiz);
    return quiz;
}