"use client";
import { useState, useEffect } from 'react';

const DigitalHackathonTimer = () => {
    // Define the end date and time of the hackathon
    const hackathonEndDate = new Date('2023-11-25T00:00:00Z').getTime();
    const [isMounted, setIsMounted] = useState(false);
    // Initialize state for the remaining time
    const [remainingTime, setRemainingTime] = useState<any>(getRemainingTime());

    // Function to calculate the remaining time
    function getRemainingTime() {
        const now = new Date().getTime();
        const timeDifference = hackathonEndDate - now;

        if (timeDifference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        // Update the remaining time every second
        const interval = setInterval(() => {
            setRemainingTime(getRemainingTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='flex flex-wrap justify-center items-center gap-4'>
            {Object.keys(remainingTime).map((unit) => (
                <div key={unit} className='flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 text-3xl md:text-4xl font-bold text-center dark:text-white text-zinc-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border rounded-md'>
                    <span>{remainingTime[unit]}</span>
                    <span>{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
                </div>
            ))}
        </div>
    );
};

export default DigitalHackathonTimer;
