import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface ITopThreeParticipants {
  name: string;
  email: string;
  avatar: string | null;
  score: number;
    rank: number;
}

const TopThreeParticipants = ({
  name,
  email,
  avatar,
  score,
  rank
}: ITopThreeParticipants) => {




   
  

  return (
    <div className="w-80 h-28 bg-zinc-100 dark:bg-zinc-800 rounded-md flex flex-col justify-start items-start px-2 relative overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-2">
        <Avatar>
          {/* @ts-ignore */}
          <AvatarImage src={avatar} />
          <AvatarFallback>CY</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-lg font-bold bg-gradient-to-r  from-gray-600 dark:from-green-600 via-gray-700 dark:via-yellow-400 to-black dark:to-emerald-500 text-transparent bg-clip-text">
            {name}
          </h1>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">{email}</p>
        </div>
      </div>
      <code className="text-2xl font-bold bg-zinc-200 dark:bg-zinc-700 px-4 py-1 rounded-sm text-gray-700 dark:text-gray-100 mt-3 flex flex-row gap-x-1 items-center justify-center">
        <Image src="/star.png" width={30} height={30} alt="star" />
        {score}
      </code>
      <Image
        src={`/${rank}.png`}
        width={50}
        height={50}
        // @ts-ignore
        alt={rank}
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default TopThreeParticipants;
