"use client";
import { useState, useEffect } from 'react';
import { GetNumberOfParticipants } from '@/server-action/hackathon';
import { Calendar, MoveRight, UserCircle2 } from 'lucide-react';
import Link from 'next/link';

const HackathonCard = () => {
  // Define the end date and time of the hackathon
  const hackathonStartDate = new Date('2023-11-25T00:00:00Z').getTime();
  const [participants, setParticipants] = useState(0);
  // Initialize state for the remaining time
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [isMounted, setIsMounted] = useState(false);

  // Function to calculate the remaining time
  function getRemainingTime() {
    const now = new Date().getTime();
    const timeDifference = hackathonStartDate - now;

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
    <Link href="/quiz-wuiz-hackathon" className="relative flex flex-col items-center gap-5 p-5 sm:p-6 overflow-hidden bg-transparent border border-slate-200 rounded-2xl sm:flex-row hover:border-slate-300 dark:hover:border-slate-600 dark:border-slate-800/80">
      <div className="relative min-h-[88px] max-h-[164px] w-full min-w-32 sm:h-[164px] sm:min-h-[164px] sm:max-h-[164px] sm:w-[164px] sm:min-w-[164px] sm:max-w-[164px] rounded overflow-hidden">
        <img
          alt="Airbyte banner"
          src="https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/652f006d50f30243f6dc/view?project=64d3707fc8db92bf44ff&mode=admin"
          decoding="async"
          data-nimg="fill"
          className="hidden sm:inline-flex sm:h-full sm:w-full"
          loading="lazy"
          style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
        />
        <img
          alt="Airbyte banner"
          src="https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/652f00765e08bd2ce295/view?project=64d3707fc8db92bf44ff&mode=admin"
          decoding="async"
          data-nimg="fill"
          className="inline-flex sm:hidden h-full w-full object-cover"
          loading="lazy"
          style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
        />
      </div>
      <div className="flex flex-col justify-between gap-4 w-full">
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex flex-row gap-2">
              <span className="text-slate-500 dark:text-slate-400">
                <Calendar size={16} />
              </span>
              <span className="font-semibold">Nov 25 - Dec 5</span>
            </div>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <div className="flex flex-row gap-2">
              <span className="font-medium">Starts in</span>
              <div className="text-emerald-500 font-semibold">
                {`${remainingTime.days}d : ${remainingTime.hours}h : ${remainingTime.minutes}m : ${remainingTime.seconds}s`}
              </div>
            </div>
          </div>
          <h2 className="mb-1 text-2xl font-bold text-slate-800 font-heading dark:text-slate-200">
            Codersyug Hackathon - <span className='text-rose-500 font-bold'>"QUIZ WUIZ"</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-normal">
          QUIZ WUIZ is a 10-day long hackathon where you can attempt quizzes and win exciting prizes🎊.
          </p>
        </div>
        <div className="flex flex-row items-center justify-end w-full gap-5">
          <div className="flex flex-col items-start flex-1 gap-2 text-sm">
            <div className="flex md:flex-row flex-col items-center font-medium gap-2 text-slate-600 dark:text-slate-300">
              <UserCircle2 size={24} />
              <span className='flex '>{participants} participating</span>
            </div>
          </div>
          <div className="flex flex-row justify-start xl:justify-end">
            <Link href={"/quiz-wuiz-hackathon"} className="rounded-full flex text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-800 focus:ring focus:ring-offset-2 focus:ring-offset-white  dark:focus:ring-offset-slate-800 disabled:bg-white disabled:border-slate-200 disabled:cursor-not-allowed disabled:text-slate-300 disabled:dark:bg-slate-950 disabled:dark:border-slate-800 disabled:dark:text-slate-800 text-xs py-1.5 px-4 items-center">
              <span className="pr-1.5">lets Start</span>
              <MoveRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HackathonCard;
