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

export const VerifyUniqueCode = async (uniqueCode: string) => {
    const profile = await currentProfile();

    if (!profile) {
        // If the user is not logged in, return an appropriate message or value
        return "User is not logged in";
    }

    const registeredParticipant = await db.quizParticipation.findFirst({
        where: {
            uniqueCode: uniqueCode, // Check if the provided uniqueCode matches any participant's uniqueCode
            userId: profile.userId, // Check that the participant is the same user who is logged in
        },
    });

    const isParticipantVerfied = await db.quizParticipation.findFirst({
        where: {
            userId: profile.userId,
            isVerified: true
        }
    })



    if (isParticipantVerfied) {
        return "You have already verified your account."
    }


    if (registeredParticipant) {
        // If a matching participant is found, update the participant's isVerified field to true
        await db.quizParticipation.update({
            where: {
                id: registeredParticipant.id,
            },
            data: {
                isVerified: true,
            },
        });
    }




    if (!registeredParticipant) {
        // If no participant with the provided uniqueCode is found, return an appropriate message or value
        return "Invalid unique code";
    }

    // If a matching participant is found, you can return additional information if needed
    return {
        participant: registeredParticipant,
        message: "Unique code verified",
    };
};



export const isUserVerified = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return false;
    }

    const VerifiedUser = await db.quizParticipation.findFirst({
        where: {
            userId: profile?.userId,
            isVerified: true
        },
    });

    return Boolean(VerifiedUser);
}