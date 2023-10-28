import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface ITopThreeParticipants {
  name: string;
  email: string;
  avatar: string;
  score: number;
    rank: string;
}

const TopThreeParticipants = ({
  name,
  email,
  avatar,
  score,
  rank
}: ITopThreeParticipants) => {




   
  

  return (
    <div className="w-80 h-28 bg-zinc-100 rounded-md flex flex-col justify-start items-start px-2 relative overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-2">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>CY</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-lg font-bold bg-gradient-to-r from-gray-700 via-gray-900 to-black text-transparent bg-clip-text">
            {name}
          </h1>
          <p className="text-sm font-semibold text-gray-600">{email}</p>
        </div>
      </div>
      <code className="text-2xl font-bold bg-zinc-200 px-4 py-1 rounded-sm text-gray-700 mt-3 flex flex-row gap-x-1 items-center justify-center">
        <Image src="/star.png" width={30} height={30} alt="star" />
        {score}
      </code>
      <Image
        src={`/${rank}.png`}
        width={70}
        height={70}
        alt={rank}
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default TopThreeParticipants;
