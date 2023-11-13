"use client";
import { useState, useEffect } from 'react';
import { GetNumberOfParticipants } from '@/server-action/hackathon';

const Timeline = () => {
  // Define the end date and time of the hackathon
  const hackathonEndDate = new Date('2023-11-25T00:00:00Z').getTime();
  const [participants, setParticipants] = useState(0);
  // Initialize state for the remaining time
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [isMounted, setIsMounted] = useState(false);

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

  const GettingNumberOfParticipants = async () => {
    const Participants = await GetNumberOfParticipants();
    setParticipants(Participants);
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
    GettingNumberOfParticipants();
  },[participants])

  useEffect(() => {
    setIsMounted(true)

  })
  if(!isMounted){
    return null
  }
    
    return (
        <section  className='w-full  dark:bg-gray-900 bg-zinc-100 px-4 py-2 mt-20 rounded-md  border-2 dark:border-emerald-300  flex flex-col md:flex-row justify-between items-center'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='
                text-2xl
                font-bold
                dark:text-white
                text-zinc-800
                '>Nov 25 - Oct 5</h1>
                <span>Dates</span>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='
                text-2xl
                font-bold
                dark:text-white
                text-zinc-800
                '>  {`${remainingTime.days}d : ${remainingTime.hours}h : ${remainingTime.minutes}m : ${remainingTime.seconds}s`}
                </h1>
                <span>Starts in
                </span>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='
                text-2xl
                font-bold
                dark:text-white
                text-zinc-800
                '>{
                    participants
                }</h1>
                <span>Students registered</span>
            </div>
        </section>
    )
}

export default Timeline