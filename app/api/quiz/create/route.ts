import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { generateUniqueCodeForQuiz } from "@/lib/utils";

export const POST = async (req: Request) => {
    try {
        const {
            Title,
            Description,
            Thumbnail,
            Level,
            NumberOfDay,
            StartDate,
            EndDate,
            questions,
        } = await req.json();
        const uniqueCode = generateUniqueCodeForQuiz();

        const profile = await currentProfile();

        const isAdmin = profile?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

        if (!profile || !isAdmin) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            );
        }

        const quiz = await db.quiz.create({
            data: {
                title: Title,
                description: Description,
                thumbnail: Thumbnail,
                level: Level,
                dayNumber: NumberOfDay,
                startDate: StartDate,
                endDate: EndDate,
                questions: {
                    createMany: {
                        data: questions.map((question: any, index: any) => {
                            return {
                                text: question.questionTitle, // Corrected this line
                                options: JSON.stringify(question.options),
                                order: index + 1,
                                correctOption: question.correctOption,
                                timer: Number(question.timer),
                            };
                        }),
                        skipDuplicates: true,
                    }
                },
                uniqueCode: uniqueCode,
            }
        })

        console.log(quiz);

        return new NextResponse(JSON.stringify(quiz), {
            status: 201,
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return new NextResponse(
            JSON.stringify({ message: `QUIZ_ERROR🧠 ${error}` }),
            {
                status: 500,
            }
        );
    }
}