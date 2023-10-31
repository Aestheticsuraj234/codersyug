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

export const getQuestionById = async (id: string) => {
    const question = await db.question.findUnique({
        where: {
            id
        }
    });


    const nextQuestion = await db.question.findFirst({
        where: {
            quizId: question?.quizId,
            // order: {
            //     gt: question?.order
            // }
        }

    })

    console.log(question);
    return question;
}


export const getAllParticipants = async () => {
    const participants = await db.quizParticipation.findMany({
        include:{
            user: true
        }
    });
  
    console.log(participants);
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
            console.log(question);
            return question?.accessLevel?.toString();
        }

