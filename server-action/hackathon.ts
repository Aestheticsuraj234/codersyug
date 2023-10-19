"use server"
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { redirect } from 'next/navigation';

// TODO: Add register logic 
        // 1. Check if user is Logged in 
        // ! If not logged in then redirect to login page
        // 2. If logged in then register the user
        // ! If user is already registered then show a toast message
        // ! If user is not registered then register the user and show a toast message
        // 3. Send mail to the user of confirmation of registration and generate quiz code
export const HandleHackathonRegistration = async () => {
try {
    const profile = await currentProfile();
    if(!profile){
        redirect('/sign-in');
    }
   

} catch (error) {
    
}
};