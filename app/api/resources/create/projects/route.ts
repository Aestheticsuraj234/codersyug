import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const POST = async (req: Request) => {
    try {
        const {
            title,
            slug,
            description,
            thumbnail,
            downloadLink,
            previewLink,
            category,
            accessType,
            price,
            resourceType,
            techStacks, // Assuming techStacks is an array of tech stack names
        } = await req.json();

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                {
                    status: 401,
                }
            );
        }

        // my techstack is the array of strings so save that also with other data
        const projects = await db.resources.create({
            data:{
                    Title: title,
                    Slug: slug,
                    Description: description,
                    Thumbnail: thumbnail,
                    DownloadLink: downloadLink,
                    previewLink: previewLink,
                    category: category,

                    accessType: accessType,
                    type: resourceType,
                    Price: parseInt(price),
                   techStack:{
                    connectOrCreate: techStacks.map((techStack:any) => ({
                        where: {
                            name: techStack,
                        },
                        create: {
                            name: techStack,
                        },
                    })),
                   },
                    author:{
                        connect: {
                            id: profile?.id
                        }
                    },

                   
            }

        })
           
        
        

        console.log(projects);
        return new NextResponse(JSON.stringify(projects), {
            status: 201,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new NextResponse(
            JSON.stringify({ message: "Error" }),
            {
                status: 500,
            }
        );
    }
};
