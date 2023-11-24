// ! Wanted to create a function which will be called by the client
"use server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import {clerkClient} from "@clerk/nextjs"


export const getAllUsers = async () => {
    const users = await clerkClient.users.getUserList();
    return users;
};

export const getUserCount = async () => {
    const totalUsers = await clerkClient.users.getCount();
    return totalUsers;
}