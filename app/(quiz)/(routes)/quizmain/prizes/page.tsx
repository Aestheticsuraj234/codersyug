import React from "react";
import PrizeBox from "../_components/PrizeBox";

const Prizes = () => {
  return (
    <div className="flex flex-col h-screen justify-start gap-10  paddings bg-[url('/prize_bg.png')] bg-cover bg-center   items-center">
    <h1 className='text-4xl font-bold text-center text-zinc-900 dark:text-zinc-100'>Prize For Winners🏆</h1>
      <PrizeBox />
    </div>
  );
};

export default Prizes;
