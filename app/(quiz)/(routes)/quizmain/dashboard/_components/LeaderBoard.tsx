"use client"
import React, { useState, useEffect } from 'react';
import { sampleLeaderboardData } from './leaderboardData';
import TopThreeParticipants from './TopThreeParticipants';

const LeaderBoard = () => {
    const [topThreeParticipants, setTopThreeParticipants] = useState<any>([]); // Initialize as an empty array

    // Function to update the top three participants
    const updateTopThree = () => {
        // Sort the leaderboard data by score in descending order
        const sortedData = sampleLeaderboardData.slice().sort((a, b) => b.score - a.score);

        // Create an array of rank strings
        const rankStrings = ['First', 'Second', 'Third'];

        // Add rank to each participant as a string
        const dataWithRank = sortedData.slice(0, 3).map((participant, index) => ({
            ...participant,
            rank: rankStrings[index] || 'Other', // Use 'Other' for ranks beyond the top 3
        }));

        setTopThreeParticipants(dataWithRank);
    };

    // Use useEffect to update the top three participants when the data changes
    useEffect(() => {
        // Call the update function initially
        updateTopThree();

        // Set up an interval to continuously update the top three participants
        const interval = setInterval(updateTopThree, 5000); // Update every 5 seconds (adjust as needed)

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center px-4 py-4 mt-10'>
            <div className='flex md:flex-row flex-col items-center justify-center gap-2'>
            {topThreeParticipants.map((participant: any) => (
                <TopThreeParticipants
                    key={participant.userId}
                    name={participant.name}
                    email={participant.email}
                    avatar={participant.avatar}
                    score={participant.score}
                    rank={participant.rank} // Pass the rank to the component as a string
                />
            ))}
            </div> 
            <div className='mt-3 py-2 hidden md:flex px-3 text-sm w-full rounded-md items-center text-gray-600 bg-zinc-100 justify-center  flex-row font-bold'>
                    You Have Earned ⭐️ 100 Points today and are ranked <code className='text-gray-100 bg-gray-700 px-4 py-1 mx-2 rounded-md'>1th</code> out of <code className='text-gray-100 bg-gray-700 px-4 py-1 mx-2 rounded-md'>1000</code> participants
            </div>
        </div>
    );
}

export default LeaderBoard;
