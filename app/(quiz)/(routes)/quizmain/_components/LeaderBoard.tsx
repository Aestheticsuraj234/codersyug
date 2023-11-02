"use client";
import React, { useState, useEffect } from 'react';
import TopThreeParticipants from './TopThreeParticipants';
import { getAllParticipants } from '@/server-action/quiz';

interface Participant {
    id: number,
    userId: string,
    isVerified: boolean,
    quizId: number,
    uniqueCode: string,
    score: number,
    rank: number,

    user: {
        id: number;
        userId: string;
        name: string;
        email: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
}

const LeaderBoard = () => {
    const [topThreeParticipants, setTopThreeParticipants] = useState<Participant[]>([]);
    const [leaderboardData, setLeaderboardData] = useState<Participant[]>([]);

    const fetchDataAndSort = async () => {
        try {
            const response = await getAllParticipants();
            // @ts-ignore
            setLeaderboardData(response);

            // Sort the data by score in descending order
            // @ts-ignore
            const sortedData = [...response].sort((a: Participant, b: Participant) => b.score - a.score);

       
            const rankStrings = ['First', 'Second', 'Third'];
            // Add rank to each participant as a string
            const dataWithRank = sortedData.slice(0, 3).map((participant, index) => ({
                ...participant,
                rank: rankStrings[index] || 'Other', // Use 'Other' for ranks beyond the top 3
            }));
            // Update topThreeParticipants
            // @ts-ignore
            setTopThreeParticipants(dataWithRank);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Fetch data and sort initially
        fetchDataAndSort();

        // Set up an interval to continuously update the top three participants
        const interval = setInterval(fetchDataAndSort, 3000); // Update every 3 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center px-4 py-4 mt-10'>
            {topThreeParticipants.length > 0 && (
                <>
                    <div className='flex md:flex-row flex-col items-center justify-center gap-2'>
                        {topThreeParticipants.map((participant) => (
                            <TopThreeParticipants
                                key={participant.userId}
                                name={participant.user.name}
                                email={participant.user.email}
                                // @ts-ignore
                                avatar={participant.user.imageUrl}
                                score={participant.score}
                                rank={participant.rank} // Use type assertion
                            />
                        ))}
                    </div>
                    <div className='mt-3 py-2 hidden md:flex px-3 text-sm w-full rounded-md items-center text-gray-600 dark:text-gray-100 bg-zinc-100  dark:bg-zinc-800 justify-center  flex-row font-bold'>
                        You Have Earned ⭐️ 100 Points today and are ranked
                        <code className='text-gray-100 bg-gray-700 px-4 py-1 mx-2 rounded-md'>1th</code>
                        out of
                        <code className='text-gray-100 bg-gray-700 px-4 py-1 mx-2 rounded-md'>1000</code>
                        participants
                    </div>
                </>
            )}
        </div>
    );
};

export default LeaderBoard;