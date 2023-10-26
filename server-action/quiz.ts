"use server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import {Quiz , Question} from "@prisma/client";




export const createQuiz = async (quiz: Quiz) => {
    const profile = await currentProfile();
    if (!profile) {
        throw new Error("Not logged in");
    }
    const newQuiz = await db.quiz.create({
        data: {
        ...quiz,

        },
    });
    return newQuiz;
};