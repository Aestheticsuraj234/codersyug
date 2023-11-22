// Import necessary dependencies and functions
"use client";
import React, { useState, useEffect } from 'react';
import TopThreeParticipants from './TopThreeParticipants';
import { getAllParticipants } from '@/server-action/quiz';
import { calculateRank } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { GetNumberOfParticipants } from '@/server-action/hackathon';

// Define the Participant interface
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

// Define the LeaderBoard component
const LeaderBoard = () => {
    const { user } = useUser();
    const [topThreeParticipants, setTopThreeParticipants] = useState<Participant[]>([]);
    const [leaderboardData, setLeaderboardData] = useState<Participant[]>([]);
    const [userRank, setUserRank] = useState<number | null>(null);
    const [userScore, setUserScore] = useState<number | null>(null);
    const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);

    // Function to fetch data and update state
    const fetchDataAndSort = async () => {
        try {
            const response = await getAllParticipants();
            setLeaderboardData(response);

            const sortedData = calculateRank(response);

            const rankStrings = ['First', 'Second', 'Third'];
            const dataWithRank = sortedData.slice(0, 3).map((participant, index) => ({
                ...participant,
                rank: rankStrings[index] || 'Other',
            }));
            setTopThreeParticipants(dataWithRank);

            const userEntry = sortedData.find((participant) => participant.userId === user?.id);
            setUserRank(userEntry ? userEntry.rank : null);
            setUserScore(userEntry ? userEntry.score : null);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Effect hook to fetch data initially and set up interval
    useEffect(() => {
        fetchDataAndSort();

        const interval = setInterval(() => {
            fetchDataAndSort();
        }, 3000);

        return () => clearInterval(interval);
    }, [fetchDataAndSort]); // Add fetchDataAndSort as a dependency

    useEffect(() => {
        const fetchNumberOfParticipants = async () => {
            try {
                const response = await GetNumberOfParticipants();
                setNumberOfParticipants(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchNumberOfParticipants();
    }, []);

    // Log statements for debugging
    console.log("top three", topThreeParticipants);
    console.log({
        userRank: userRank,
        userScore: userScore,
    });

    // Return the JSX for the component
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
                                avatar={participant.user.imageUrl}
                                score={participant.score}
                                rank={participant.rank}
                            />
                        ))}
                    </div>
                    {userRank !== null && (
                        <div className='mt-3 py-2 hidden md:flex px-3 text-sm w-full rounded-md items-center text-gray-600 dark:text-gray-100 bg-zinc-100 dark:bg-zinc-800 justify-center flex-row font-bold'>
                            You Have Earned ⭐️<span className='text-green-500 mr-1'>{userScore}</span>  Points and are ranked
                            <code className='text-gray-100 bg-gray-700 px-4 py-1 mx-2 rounded-md'>{userRank}th</code>
                            out of
                            <code className='text-gray-100 bg-gray-700 px-4 py-1 mx-2 rounded-md'>{numberOfParticipants}</code>
                            participants
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LeaderBoard;
