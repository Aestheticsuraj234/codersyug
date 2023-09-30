import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const POST = async (req: Request) => {
    try {
        const { title, slug, description, thumbnail, downloadLink, category } = await req.json();
        // console.log(title, slug, description, thumbnail, downloadLink, category);


        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse(JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                });
        }

        const ebook = await db.resources.create({
            data: {
                Title: title,
                Slug: slug,
                Description: description,
                Thumbnail: thumbnail,
                DownloadLink: downloadLink,
                category: category,
                author: {
                    connect: {
                        id: profile?.id
                    }
                }


            }
        })

        // console.log(ebook);



        return NextResponse.json(ebook, {
            status: 201,
        });

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: "error" }),
            {
                status: 500,
            }
        )

    }
}



