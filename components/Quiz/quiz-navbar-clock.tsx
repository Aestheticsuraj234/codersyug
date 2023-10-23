"use client"
import React, { useState, useEffect } from 'react';
import { set } from 'zod';

const QuizNavbarClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            // Clear the interval when the component unmounts
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, [])


    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

    if (!isMounted) {
        return null;
    }


    return (
        <div className="flex flex-row justify-center items-center gap-2">
            <p className="text-zinc-600 dark:text-zinc-300 font-medium">{formattedTime}</p>
            <div className="w-1 h-1 bg-zinc-600 dark:bg-zinc-300 rounded-full"></div>
            <p className="text-zinc-600 dark:text-zinc-300 font-medium">{formattedDate}</p>
        </div>
    );
};

export default QuizNavbarClock;
