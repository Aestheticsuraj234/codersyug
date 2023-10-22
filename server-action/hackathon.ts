"use server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { generateUniqueCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { sendMail } from "@/lib/mail";


export const HandleRegistration = async () => {
    const profile = await currentProfile();
    const UniqueCode = generateUniqueCode(profile?.userId);

    if (!profile) {
        return redirect("/sign-in")
    }

    const isUserParticipated = await db.quizParticipation.findUnique({
        where: {
            userId: profile?.userId
        },
    });

    if (isUserParticipated) {
        return "You have already participated in the quiz."
    }

    await sendMail(profile?.email, profile?.name, UniqueCode);

    const quizParticipation = await db.quizParticipation.create({
        data: {
            uniqueCode: UniqueCode,
            user: {
                connect: {
                    userId: profile.userId
                }
            }
        },
    });

    if (!quizParticipation) {
        return "Something went wrong. Please try again."
    }

    revalidatePath("/hackathon");

    return Boolean(quizParticipation);
};


export const isUserAlreadyRegistered = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return false;
    }

  const RegisteredUser = await db.quizParticipation.findUnique({
        where: {
            userId: profile?.userId // Use 'userId' instead of 'id'
        },
    });

    return Boolean(RegisteredUser);
};


export const GetNumberOfParticipants = async () => {
    const participants = await db.quizParticipation.count();

    return participants
}